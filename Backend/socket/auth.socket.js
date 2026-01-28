const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const socketAuth = (io) => {
  io.use((socket, next) => {
    try {
      // 🔥 Parse cookies from handshake
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) {
        return next(new Error("No cookies sent"));
      }

      const parsedCookies = cookie.parse(cookies);
      const token = parsedCookies.Token; // 👈 use your cookie name

      if (!token) {
        return next(new Error("JWT not found in cookies"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = {
        id: decoded.id,
        role: decoded.role,
      };

      next();
    } catch (err) {
      next(new Error("Invalid or expired token"));
    }
  });
};

module.exports = socketAuth;
