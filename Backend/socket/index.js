const { Server } = require("socket.io");
const chatSocket = require("./chat.socket");
const socketAuth = require("./auth.socket");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://10.184.85.122:5173"],
      credentials: true,
    },
  });

  // 🔐 JWT AUTH MIDDLEWARE
  socketAuth(io);

  io.on("connection", (socket) => {
    console.log(
      `🟢 Socket connected: ${socket.id} | ${socket.user.role} ${socket.user.id}`,
    );

    chatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initSocket;
