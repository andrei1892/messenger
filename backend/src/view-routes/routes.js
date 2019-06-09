const express = require("express");
const REQUESTS = require("../control/requests");
const router = express.Router();
const MIDDLEWARE = require("../control/middleware");
// shorthand routes

router.post("/register", REQUESTS.register);
router.post("/login", REQUESTS.login);
//middleware
router.use("/user", MIDDLEWARE);
router.get("/user/get_my_data", REQUESTS.get_my_data);
router.get("/user/get_friends", REQUESTS.get_friends);
router.get("/user/get_friends_suggestions", REQUESTS.get_friends_suggestions)
router.get("/user/get_conversations", REQUESTS.get_conversations_list);
router.get("/user/search_friends", REQUESTS.search_friends);

router.post("/send_friend_request", REQUESTS.send_friend_request);
router.post("/accept_request", REQUESTS.accept_friend_request )
router.post("/send_seen", REQUESTS.send_seen_event);
router.post("/send_message", REQUESTS.send_message);

module.exports = router;
