const ChatRoom = require("../../models/ChatroomDB");
const Message = require("../../models/MessageDB");

/**
 * GET /api/chat/room/:vendorId
 * Find or create User ↔ Vendor chat room
 */
exports.getOrCreateRoom = async (req, res) => {
  try {
      const userId = req.user.id;
     console.log("user id", userId);  // from JWT
    const vendorId = req.params.vendorId;

    let room = await ChatRoom.findOne({
      user: userId,
      vendor: vendorId
    });

    if (!room) {
      room = await ChatRoom.create({
        user: userId,
        vendor: vendorId
      });
    }

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room" });
  }
};

/**
 * GET /api/chat/rooms
 * Sidebar chat list
 */
exports.getChatRooms = async (req, res) => {
  try {
      const userId = req.user.id;
      console.log("user id",userId);
      
      const role = req.user.role; // "User" or "Vendor"
      console.log(role);
      

    const filter =
      role === "vendor"
        ? { vendor: userId }
        : { user: userId };

    const rooms = await ChatRoom.find(filter)
      .populate("user", "name avatar")
      .populate("vendor", "businessName logo")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

/**
 * GET /api/chat/messages/:chatRoomId
 */
exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const messages = await Message.find({ chatRoom: chatRoomId })
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
