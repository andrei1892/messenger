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

const weekdays = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);
const months = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);

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
    USER.findOne({ username: req.body.username }).then(response => {
      if (response === null)
        res
          .status(404)
          .json({ isValid: false, message: "Username does not exist" });
      else if (response.password !== req.body.password)
        res
          .status(403)
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
    res.status(400).json({
      isValid: false,
      message: "Please insert a valid username or password"
    });
};

const get_my_data = (req, res) => {
  USER.findOne({ username: req.payload.username })
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
};

const get_friends = (req, res) => {
  identifier(req.payload.id).then(user => {
    // crt user
    if (user) {
      USER.find({ _id: { $in: user.requests_to_confirm } }) // all ids (users) in requests_to_confirm
        .then(pendings => {
          //# pendings is an array with all users in crt user's requests_to_confirm
          USER.find({ _id: { $in: user.waiting_for_confirmation } }) // all ids in waiting_for_confirmation
            .then(awaiting => {
              //# awaiting is an array with all users in crt user's waiting_for_confirmation
              USER.find({ _id: { $in: user.friends.map(x => x.friend) } }) // all ids in friends
                .then(friends => {
                  // friends is an array with all users in crt users's friends
                  res.status(200).json({
                    // sending 3 arrays with the fname, lname and ids for each category
                    friends: friends.map(friend => {
                      return {
                        firstname: friend.firstname,
                        lastname: friend.lastname,
                        id: friend._id.toString()
                      };
                    }),
                    pending: pendings.map(user => {
                      return {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        id: user._id.toString()
                      };
                    }),
                    awaiting: awaiting.map(user => {
                      return {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        id: user._id.toString()
                      };
                    })
                  });
                });
            });
        });
    } else {
      res.sendStatus(404);
    }
  });
};

const get_friends_suggestions = (req, res) => {
  let findUser = { username: req.payload.username };
  USER.findOne(findUser).then(response => {
    if (response === null) res.status(404).json({ message: "No user found" });
    else {
      USER.find(
        // find all users excluding the ones in crt_user network
        {
          _id: {
            $nin: [
              response._id, // not crt user
              ...response.waiting_for_confirmation,
              ...response.requests_to_confirm,
              ...response.friends.map(x => x.friend)
            ]
          }
        },
        { firstname: 1, lastname: 1 } // return only fname & lname
      ).then(result => {
        if (result === null)
          res.status(404).json({ message: "No suggestions found" });
        res.status(200).json({ suggestions: result });
      });
    }
  });
};

const get_conversations = (req, res) => {
  identifier(req.payload.id).then(user => {
    MESSAGES.find({
      // get conversations with contain crt_user
      participants: {
        $in: user._id
      }
    })
      .populate([
        { path: "participants", select: "firstname lastname" },
        { path: "last_sender", select: "firstname lastname" }
      ])
      .exec((err, conversations) => {
        allConversations = JSON.parse(JSON.stringify(conversations)).map(
          conv => {
            conv.other = {}; // `${firstname} ${lastname}`
            conv.timestamp = {};
            if (conv.messages.length === 0) {
              conv.messages = {
                message_content: "You've got a new friend. Say Hi!"
              }; //default message for new conversations
            } else {
              conv.messages = conv.messages[conv.messages.length - 1]; // return only last message
            }
            // get fname&lname about the other participant to display
            if (conv.participants[0]._id.toString() === user._id.toString()) {
              conv.other.firstname = conv.participants[1].firstname; //other
              conv.other.lastname = conv.participants[1].lastname;
            } else {
              conv.other.firstname = conv.participants[0].firstname;
              conv.other.lastname = conv.participants[0].lastname;
            }
            let timestamp = new Date(conv.last_update);
            conv.timestamp.date = `${timestamp.getDate()}-${
              months[timestamp.getMonth()]
            }-${timestamp.getFullYear()}`;
            conv.timestamp.weekday = weekdays[timestamp.getDay()];
            conv.timestamp.time = `${
              timestamp.getHours() < 10
                ? "0" + timestamp.getHours()
                : timestamp.getHours()
            }: ${
              timestamp.getMinutes() < 10
                ? "0" + timestamp.getMinutes()
                : timestamp.getMinutes()
            }`;
            return conv;
          }
        );
        res.status(200).json({ conversations: allConversations });
      });
  });
};

const get_conversation = (req, res) => {
  if (!req.query.id) {
    res.sendStatus(404);
  }
  let convId = new ObjectID(req.query.id);
  MESSAGES.findOne({ _id: convId }) // {participants: 0}
    .then( conv => {
       conv.seen = true;
       conv.save( (err, response) => {
        if(err) res.status(400).json({ message: err });
        else res.status(200).json({ conversation: conv })
      })
  })
    .catch(err => res.status(404).json({ message: "Nothing found", err: err }));
};

const get_info_about = (req, res) => {
  let id = new ObjectID(req.query.id);
  USER.findOne({_id: id}).then( user => {
    if( user === null)
    res.status(404).json({message: 'No user found'})
    else {
      // could check if user who makes request is friend with the user he is requesting data about;
      // restrict info about if they are not friends;
      const userInfo = {};
      userInfo.firstname = user.firstname;
      userInfo.lastname = user.lastname;
      userInfo.email = user.email;
      res.status(200).json({userinfo: userInfo})
    }
  })
}

const send_friend_request = (req, res) => {
  let findSender = { username: req.payload.username };
  let receiverId = req.body.receiver;
  let rec_id = new ObjectID(receiverId);
  // * sending a fr_req consists on adding both participants on each others waiting & to_confirm lists
  USER.findOne(findSender)
    .then(senderResponse => {
      if (senderResponse === null)
        res.status(404).json({ message: "No user found" });
      else {
        if (
          // check if the sender hasn't already made a request
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
          senderResponse.last_activity = Date.now();
          senderResponse.save((err, response) => {
            if (err) res.status(400).json({ message: err });
          });

          USER.findOne({ _id: rec_id }).then(receiverResponse => {
            if (receiverResponse === null)
              res.status(404).json({ message: "No user found" });
            else {
              if (
                !receiverResponse.waiting_for_confirmation.find(
                  sender => sender === req.payload.id.toString()
                ) &&
                !receiverResponse.friends.find(
                  sender => sender === req.payload.id.toString()
                ) &&
                !receiverResponse.requests_to_confirm.find(
                  sender => sender === req.payload.id.toString()
                )
              ) {
                receiverResponse.requests_to_confirm.push(req.payload.id);
                receiverResponse.save((err, response) => {
                  if (err) res.status(400).json({ message: err });
                  else res.status(200).json({ message: "Friend Request Sent" });
                });
              } else {
                res
                  .status(400)
                  .json({ message: "Friend request was already sent" });
              }
            }
          });
        } else {
          res.status(400).json({ message: "Friend request was already sent" });
        }
      }
    })
    .catch(err => res.status(404).json({ message: err }));
};

const accept_friend_request = (req, res) => {
  USER.findOne({ username: req.payload.username }).then(user => {
    if (user === null) res.status(403).json({ message: "Request denied" });
    else {
      identifier(req.body.friend).then(friend => {
        if (req.body.response === "accept") {
          // find the sender_user
          //# on accepting a request ; a new conversation is created ;
          let newConversation = new MESSAGES({
            participants: [user._id, friend._id],
            last_sender: user._id,
            seen: false
          });
          newConversation.save();
          // remove the user from waiting list on sender  & add to friend list
          friend.waiting_for_confirmation = friend.waiting_for_confirmation.filter(
            id => id != req.payload.id
          );
          friend.friends.push({
            friend: user._id,
            conversation: newConversation._id
          });
          friend.save();
          // remove the sender on crt_user & add sender to user list
          user.requests_to_confirm = user.requests_to_confirm.filter(
            id => id != req.body.friend
          );
          user.friends.push({
            friend: friend._id,
            conversation: newConversation._id
          });
          user.last_activity = Date.now();
          user.save((err, response) => {
            if (err) {
              res.status(409).json({ accepted: false, message: err });
            } else
              res
                .status(200)
                .json({ accepted: true, message: "Request Accepted" });
          });
        } else if (req.body.response === "reject") {
          friend.waiting_for_confirmation = friend.waiting_for_confirmation.filter(
            id => id != req.payload.id
          );
          friend.save();
          user.requests_to_confirm = user.requests_to_confirm.filter(
            id => id != req.body.friend
          );
          user.save((err, response) => {
            if (err) {
              res.status(409).json({ accepted: false, message: err });
            } else
              res
                .status(200)
                .json({ accepted: false, message: "Request Rejected" });
          });
        }
      });
    }
  });
};

const send_message = (req, res) => {
  let convId = new ObjectID(req.body.conversationId);
  let userId = new ObjectID(req.payload.id);
  MESSAGES.findOne({ _id: { $in: convId } })
    .then(conv => {
      // check if token_id is part of the conversations participants ; security check
      let check = conv.participants.find(
        partcipantId => partcipantId.toString() === req.payload.id.toString()
      );
      if (check) {
        conv.messages.push({
          sender: userId,
          message_content: req.body.message
        });
        conv.last_sender = userId;
        conv.last_update = Date.now();
        conv.seen = false;
        conv.save((err, response) => {
          if (err) res.status(400).json({ message: err });
        });

        identifier(userId).then(user => {
          user.last_activity = Date.now();
          user.save((err, response) => {
            if (err) {
              res.status(409).json({ message: err });
            } else
              res
                .status(200)
                .json({ convId: conv._id, message: "mesage sent" });
          });
        });
      } else
        res
          .status(403)
          .json({ message: "You are not part of this conversation" });
    })
    .catch(err => res.status(404).json({ message: err }));
};

const search_message = (req, res) => {
  let convId = new ObjectID(req.body.conversationId);
  MESSAGES.findOne({ _id: convId })
    .then(response => {
      let check = response.participants.find(
        partcipantId => partcipantId.toString() === req.payload.id.toString()
      );
      if (check) {
        let search = new RegExp(req.body.search_message, "g");
        let searchResult = response.messages.reduce((acc, crt) => {
          if (crt.message_content.match(search)) acc.push(crt);
          return acc;
        }, []);
        res.status(200).json({ search: searchResult });
      } else
        res
          .status(403)
          .json({ message: "You are not part of this conversation" });
    })
    .catch(err => res.status(404).json({ message: err }));
};

const send_seen_event = (req, res) => {};
const search_friends = (req, res) => {};
const check_activity = (req, res) => {};

// secure backend routes; more verifications
// set timeout - requests
// check activity -> trebuie sa tragi datele de la server sau nu
// cu timestamp ; pe partea de client ultimu time-stamp primit;
// la req se modifica datele

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
  get_info_about,
  get_conversation,
  send_seen_event,
  send_message,
  search_message,
  check_activity
};
