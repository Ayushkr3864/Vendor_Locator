
const express = require("express");
const router = express.Router();

const {
  getOrCreateRoom,
  getChatRooms,
  getMessages,
} = require("../../controllers/chat/message.controller");

const authenticate = require("../../middleware/isLoggedIn");
router.get("/room/:vendorId", authenticate, getOrCreateRoom);

// Get chat rooms (sidebar)
router.get("/rooms", authenticate, getChatRooms);

// Get messages of a room
router.get("/messages/:chatRoomId", authenticate, getMessages);

module.exports = router;
