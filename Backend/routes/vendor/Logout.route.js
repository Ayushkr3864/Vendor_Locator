const express = require("express")
const Logout = require("../../controllers/vendor/Logout.controller");
const isLoggedIn = require("../../middleware/isLoggedIn");
const app = express.Router()

app.get("/",isLoggedIn, Logout)

module.exports = app;