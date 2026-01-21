const express = require("express")
const featuredVendor = require("../../controllers/vendor/featuredVendor.controller")
const app = express.Router();

app.get("/", featuredVendor)

module.exports = app