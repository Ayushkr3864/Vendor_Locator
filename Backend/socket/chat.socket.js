const ChatRoom = require("../models/ChatroomDB");
const Message = require("../models/MessageDB");

const chatSocket = (io, socket) => {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { chatRoom, text, attachments } = data;

      // ✅ Sender info from VERIFIED token
      const senderId = socket.user.id;
      const senderModel = socket.user.role;

      const message = await Message.create({
        chatRoom,
        sender: senderId,
        senderModel,
        text,
        attachments,
      });

      await ChatRoom.findByIdAndUpdate(chatRoom, {
        lastMessage: message._id,
        lastMessageAt: new Date(),
      });

      io.to(chatRoom).emit("receiveMessage", message);
    } catch (err) {
      socket.emit("messageError", "Message failed");
    }
  });
};

module.exports = chatSocket;
