const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const updateProfile = require("../../controllers/vendor/updateProfile.controller");
const shopUpload = require("../../middleware/shopImage");
const upload = require("../../middleware/upload");
const app = express.Router();

app.put("/updateProfile/:id", isLoggedIn, isVendor,upload.single("shopImage"), updateProfile);

module.exports = app