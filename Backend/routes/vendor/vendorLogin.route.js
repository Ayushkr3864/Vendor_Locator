const express = require("express");
const vendorLogin = require("../../controllers/vendor/vendorLogin.controller");
const app = express.Router();

app.post("/", vendorLogin)

module.exports = app;