const express = require("express");
const featuredVendor = require("../../controllers/vendor/featuredVendor.controller");
const app = express.Router();
const { apiLimiter } = require("../../rateLimiter/limiter");
app.get("/", apiLimiter, featuredVendor);

module.exports = app;
