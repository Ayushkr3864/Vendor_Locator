const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const vendorProfile = require("../../controllers/vendor/vendorProfile.controller");
const app = express.Router();
const { apiLimiter } = require("../../rateLimiter/limiter");
app.get("/", apiLimiter, isLoggedIn, isVendor, vendorProfile);

module.exports = app;
