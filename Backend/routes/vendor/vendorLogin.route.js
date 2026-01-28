const express = require("express");
const vendorLogin = require("../../controllers/vendor/vendorLogin.controller");
const app = express.Router();
const { apiLimiter, loginLimiter } = require("../../rateLimiter/limiter");
app.post("/", loginLimiter, vendorLogin);

module.exports = app;
