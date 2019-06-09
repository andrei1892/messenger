const jwt = require("jsonwebtoken");
const USER = require("../model/usersTemplate");
const ObjectID = require("mongodb").ObjectID;
const MESSAGES = require("../model/messagesSchema");
const CONFIG = require("../config");

const register = (req, res) => {
  if (
    req.body.firstname &&
    req.body.lastname &&
    req.body.password &&
    req.body.email
  ) {
    let newUser = new USER({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
      username: req.body.email
    });

    newUser.save(err => {
      if (err) {
        console.log(err);
        res
          .status(409)
          .json({ isValid: false, message: "User already exists" });
      } else
        res
          .status(200)
          .json({ isValid: true, message: "Registration completed" });
    });
  } else
    res
      .status(400)
      .json({ isValid: false, message: "Please complete all fields" });
};

const login = (req, res) => {
  if (req.body.username && req.body.password) {
    let findUser = { username: req.body.username, password: req.body.password };

    USER.findOne(findUser).then(response => {
      if (response === null)
        res
          .status(404)
          .json({ isValid: false, message: "Username or password incorrect" });
      else {
        let id = response._id;
        let user_id = new ObjectID(id);
        let token = jwt.sign(
          { username: req.body.username, id: user_id },
          CONFIG.JWT_SECRET_KEY
        );
        res
          .status(200)
          .json({ isValid: true, token: token, message: "Login Succesfull" });
      }
    });
  } else
    res.send(400).json({
      isValid: false,
      message: "Please insert a valid username or password"
    });
};

const get_my_data = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    let findUser = { username: payload.username };
    USER.findOne(findUser)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: "No user found" });
        } else {
          res.status(200).json({
            firstname: response.firstname,
            lastname: response.lastname
          });
        }
      })
      .catch(err => res.status(404).json({ message: err }));
  });
};

const get_friends = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    let findUser = { username: payload.username };
    USER.findOne(findUser)
      .then(response => {
        if (response === null)
          res.status(404).json({ message: "No user found" });
        else {
          res.status(200).json({ friends: response.friends , pending: response.requests_to_confirm });
        }
      })
      .catch(err => res.status(404).json({ message: err }));
  });
};

const get_friends_suggestions = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    let findUser = { username: payload.username };
    USER.findOne(findUser).then(response => {
      if (response === null) res.status(404).json({ message: "No user found" });
      else {
        USER.find(
          {
            username: {
              $nin: [...response.friends, payload.username]
            }
          },
          { firstname: 1, lastname: 1 }
        ).then(result => {
          if (result === null)
            res.status(404).json({ message: "No suggestions found" });
          res.status(200).json({ suggestions: result });
        });
      }
    });
  });
};

const get_conversations_list = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    let findUser = { username: payload.username };
    USER.findOne(findUser).then();
  });
};

const send_friend_request = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    let findSender = { username: payload.username };
    let receiverId = req.body.receiver;
    let rec_id = new ObjectID(receiverId);

    USER.findOne(findSender).then(senderResponse => {
      if (senderResponse === null)
        res.status(404).json({ message: "No user found" });
      else {
        if (
          !senderResponse.waiting_for_confirmation.find(
            r_Id => r_Id.toString() === rec_id.toString()
          ) &&
          !senderResponse.friends.find(
            r_Id => r_Id.toString() === rec_id.toString()
          ) &&
          !senderResponse.requests_to_confirm.find(
            r_Id => r_Id.toString() === rec_id.toString()
          )
        ) {
          senderResponse.waiting_for_confirmation.push(rec_id.toString());
          senderResponse.save((err, result) => {
            if (err) res.status(400).json({ message: err });
          });

          console.log("friend request sent"); // alternativa USER.updateOne({criteriu})

          USER.findOne({ _id: rec_id }).then(receiverResponse => {
            if (receiverResponse === null)
              res.status(404).json({ message: "No user found" });
            else {
              //console.log(receiverResponse)
              if (
                !receiverResponse.waiting_for_confirmation.find(
                  sender => sender === payload.id.toString()
                ) &&
                !receiverResponse.friends.find(
                  sender => sender === payload.id.toString()
                ) &&
                !receiverResponse.requests_to_confirm.find(
                  sender => sender === payload.id.toString()
                )
              ) {
                receiverResponse.requests_to_confirm.push(
                  payload.id.toString()
                );
                receiverResponse.save((err, result) => {
                  if (err) res.status(400).json({ message: err });
                  else res.status(200).json({ message: "Friend Request Sent" });
                });
                console.log("friend request received");
              } else console.log("request was already received");
            }
          });
        } else {
          console.log("request was already sent");
          res.status(400).json({ message: "Friend request was already sent" });
        }
      }
    });
  });
};

const get_friends_request = (req, res) => {};

const search_friends = (req, res) => {};

// const /* [accept,decline]_ */frient_request;

const accept_friend_request = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }

    let newConversation = new MESSAGES({
      participants: [payload.id.toString(), req.body.friend.toString() ],
      seen: false
    });

    newConversation.save(err => {
      if (err) {
        console.log(err);
        res.status(409).json({ accepted: false, message: err });
      } else
        res.status(200).json({ accepted: true, message: "Request Accepted" });
    });
  });
};

const get_conversation = (req, res) => {};

const send_seen_event = (req, res) => {};

const send_message = (req, res) => {  
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }

    MESSAGES.findOne( { participants: {$in: payload.id} }  )
    .then(response => {
        console.log(response)
    })

  })
};

const check_activity = (req, res) => {};

module.exports = {
  register,
  login,
  get_my_data,
  get_friends,
  get_friends_suggestions,
  get_conversations_list,
  get_friends_request,
  search_friends,
  send_friend_request,
  accept_friend_request,
  get_conversation,
  send_seen_event,
  send_message,
  check_activity
};
