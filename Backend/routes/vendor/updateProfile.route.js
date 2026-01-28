const express = require("express");
const app = express.Router()
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const upload = require("../../middleware/upload")
const updateProfile = require("../../controllers/vendor/updateProfile.controller")
app.put("/updateProfile/", isLoggedIn,isVendor,upload.single("vendorimg"),updateProfile)

module.exports = app