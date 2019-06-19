const jwt = require("jsonwebtoken");
const USER = require("../model/usersTemplate");
const ObjectID = require("mongodb").ObjectID;
const MESSAGES = require("../model/messagesSchema");
const CONFIG = require("../config");

const identifier = id => {
  let get_id = new ObjectID(id);
  return USER.findOne({ _id: get_id }).then(response => {
    if (response === null) return null;
    else return response;
  });
};

// daca poate sa imi explice asnyc/await;

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
            lastname: response.lastname,
            id: response._id
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
    //let findUser = { username: payload.username };
    identifier(payload.id).then(user => {
      if (user) {
        USER.find({ _id: { $in: user.requests_to_confirm } }).then(pendings => {
          USER.find({ _id: { $in: user.friends.map(x => x.friend) } }).then(
            friends => {
              res.status(200).json({
                friends: friends.map(friend => {
                  return {
                    firstname: friend.firstname,
                    lastname: friend.lastname,
                    id: friend._id.toString()
                  };
                }), //user.friends, // response.friends,
                pending: pendings.map(user => {
                  return {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    id: user._id.toString()
                  };
                })
              });
            }
          );
        });
      } else {
        res.sendStatus(404);
      }
    });
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
            _id: {
              $nin: [
                ...response.requests_to_confirm,
                response._id,
                ...response.friends.map(x => x.friend)
              ]
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

const get_conversations = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    identifier(payload.id).then(user => {
      MESSAGES.find({
        participants: {
          $in: user._id 
        }
      }).then(conversations => {
        conversations = conversations.map(conv => {
          if (conv.messages.length - 1 < 0) {
            conv.messages = [
              { msg_content: "You've got a new conversation. Say Hi" }
            ];
          } else {
            conv.messages = conv.messages[conv.messages.length - 1];
          }
          return conv;
        });
        //console.log(JSON.stringify(conversations));
        res.status(200).json({ conversations: conversations });
      });
    });
    // });
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
            id => id.toString() === rec_id.toString()
          ) &&
          !senderResponse.friends.find(
            id => id.toString() === rec_id.toString()
          ) &&
          !senderResponse.requests_to_confirm.find(
            id => id.toString() === rec_id.toString()
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
                receiverResponse.requests_to_confirm.push(payload.id);
                receiverResponse.save((err, result) => {
                  if (err) res.status(400).json({ message: err });
                  else res.status(200).json({ message: "Friend Request Sent" });
                });
                console.log("friend request received");
              } else {
                console.log("request was already received");
                res
                  .status(400)
                  .json({ message: "Friend request was already sent" });
              }
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

const search_friends = (req, res) => {};

const accept_friend_request = (req, res) => { // adaugat si decline
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.send(403);

    USER.findOne({ username: payload.username }).then(user => {
      if (user === null) res.status(404).json({ message: "No user found" });
      else {
        identifier(req.body.friend).then(friend => {
          // console.log(`cele 2 id-uri: ${user._id} si ${friend._id}`);
          // console.log(`friend is ${friend}`);
          // console.log(`eu : ${user}`);

          let newConversation = new MESSAGES({
            participants: [user._id, friend._id],
            seen: false
          });

          newConversation.save();

          console.log(newConversation);

          friend.waiting_for_confirmation = friend.waiting_for_confirmation.filter(
            x => x != payload.id
          );
          friend.friends.push({
            friend: user._id,
            conversation: newConversation._id
          });
          friend.save();

          user.requests_to_confirm = user.requests_to_confirm.filter(
            x => x != req.body.friend
          );
          user.friends.push({
            friend: friend._id,
            conversation: newConversation._id
          });

          user.save((err, result) => {
            if (err) {
              console.log(err);
              res.status(409).json({ accepted: false, message: err });
            } else
              res
                .status(200)
                .json({ accepted: true, message: "Request Accepted" });
          });
        });
      }
    });
  });
};

const get_conversation = (req, res) => {
  console.log(req.query.id);
  let convId = new ObjectID(req.query.id);
  MESSAGES.findOne({_id: convId}) // {participants: 0}
  .then(response => res.status(200).json({conversation: response}) )
  .catch( err => res.status(404).json({message:"No conversation found"})  )
};

const send_seen_event = (req, res) => {};

const send_message = (req, res) => {
  jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.send(403);
    }
    console.log(req.body)
    let convId = new ObjectID(req.body.conversationId);
    let userId = new ObjectID(payload.id)
    MESSAGES.findOne({ _id: { $in: convId } })
    .then(response => {
      response.messages.push({sender: userId, msg_content: req.body.message })
      response.last_update = Date.now();
      response.save((err, result) => {
        if (err) {
          console.log(err);
          res.status(409).json({message: err });
        } else
          res.status(200)
      });
    });
  });
};

const check_activity = (req, res) => {};

module.exports = {
  register,
  login,
  get_my_data,
  get_friends,
  get_friends_suggestions,
  get_conversations,
  search_friends,
  send_friend_request,
  accept_friend_request,
  get_conversation,
  send_seen_event,
  send_message,
  check_activity
};
