const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const Authenticate = require("../../controllers/vendor/authenticate.controller");
const app = express.Router();
const { apiLimiter } = require("../../rateLimiter/limiter");
app.get("/", apiLimiter, isLoggedIn, (req, res) => {
  res
    .status(200)
    .json({ isauthenticate: true, message: "verified", role: req.user.role });
});
module.exports = app;
