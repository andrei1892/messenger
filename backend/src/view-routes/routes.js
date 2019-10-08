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
router.get("/user/get_conversations", REQUESTS.get_conversations);
router.get("/user/get_conversation", REQUESTS.get_conversation);
router.get("/user/get_info_about", REQUESTS.get_info_about);

router.post("/user/send_friend_request", REQUESTS.send_friend_request);
router.post("/user/accept_request", REQUESTS.accept_friend_request )
router.post("/user/send_seen", REQUESTS.send_seen_event);
router.post("/user/send_message", REQUESTS.send_message);
router.post("/user/search_message", REQUESTS.search_message )
router.post("/user/search_friends", REQUESTS.search_friends);

module.exports = router;
