const express = require("express");
const userRegister = require("../../controllers/user/userRegistration.controller");
const upload = require("../../middleware/userImage");
const isLoggedIn = require("../../middleware/isLoggedIn");
const {
  loginLimiter,
  registerLimiter,
  apiLimiter,
} = require("../../rateLimiter/limiter");

const app = express.Router();
const userLogin = require("../../controllers/user/userLogin.controller");
const getUser = require("../../controllers/user/getUser.controller");
app.post("/register", registerLimiter, upload.single("avatar"), userRegister);
app.post("/login", loginLimiter, userLogin);
app.get("/get", apiLimiter, isLoggedIn, getUser);
module.exports = app;
