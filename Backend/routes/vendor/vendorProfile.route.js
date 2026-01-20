const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const vendorProfile = require("../../controllers/vendor/vendorProfile.controller");
const app = express.Router();

app.get("/", isLoggedIn, isVendor, vendorProfile)

module.exports = app;