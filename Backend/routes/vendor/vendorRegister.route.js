const express = require("express");
const register = require("../../controllers/vendor/vendorRegister.controller");
const app = express.Router();
const upload = require("../../middleware/upload");
const { apiLimiter, registerLimiter } = require("../../rateLimiter/limiter");
app.post("/", registerLimiter, upload.single("vendorimg"), register);

module.exports = app;
