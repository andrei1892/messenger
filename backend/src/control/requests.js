const jwt = require("jsonwebtoken");
const USER = require("../model/usersTemplate");
const CONFIG = require("../config");

const register = (req, res) => {
  console.log(req.body);
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
      if (err) { console.log(err);
        res.status(409).json({ isValid: false, message: "User already exists" });}
      else res.status(200).json({ isValid: true,  message: "Registration completed" });
    });
  } else res.status(400).json({ isValid: false, message: "Please complete all fields" });
};

const login = (req, res) => {
  if (req.body.username && req.body.password) {
    let findUser = { username: req.body.username, password: req.body.password };

    USER.findOne(findUser).then(response => {
      if (response === null)
        res.status(404).json({ isValid:false, message: "Username or password incorrect" });
      else {
        let token = jwt.sign(
          { username: req.body.username },
          CONFIG.JWT_SECRET_KEY
        );
        res.status(200).json({ isValid: true, token: token, message: "Login Succesfull" });
      }
    });
  } else
    res
      .send(400)
      .json({ isValid: false, message: "Please insert a valid username or password" });
};

const get_my_data = (req, res) => {};

const get_conversations_list = (req, res) => {};

const get_friends_request = (req, res) => {};

const search_friends = (req, res) => {};

const send_friend_request = (req, res) => {};

// const /* [accept,decline]_ */frient_request;

const get_conversation = (req, res) => {};

const send_seen_event = (req, res) => {};

const send_message = (req, res) => {};

const check_activity = (req, res) => {};

module.exports = {
  register,
  login,
  get_my_data,
  get_conversations_list,
  get_friends_request,
  search_friends,
  send_friend_request,

  get_conversation,
  send_seen_event,
  send_message,
  check_activity
};
