const express = require("express");
const REQUESTS = require("../control/requests");
const router = express.Router();

// shorthand routes

router.post("/register", REQUESTS.register);
router.post("/login", REQUESTS.login);
router.get("/get_conversations", REQUESTS.get_conversations_list);
router.get("/search_friends", REQUESTS.search_friends);
router.post("/send_frequest", REQUESTS.send_friend_request);
router.post("/send_seen", REQUESTS.send_seen_event);
router.post("/send_message", REQUESTS.send_message);

module.exports = router;
