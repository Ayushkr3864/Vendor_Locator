const express = require("express");
const register = require("../../controllers/vendor/vendorRegister.controller");
const app = express.Router();
const upload = require("../../middleware/upload")

app.post("/",upload.single("vendorimg"), register)

module.exports = app;