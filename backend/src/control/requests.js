const jwt = require("jsonwebtoken");

const login = (req, res) => {};

const register = (req, res) => {};

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
