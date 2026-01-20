const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const Authenticate = require("../../controllers/vendor/authenticate.controller");
const app = express.Router();

app.get("/",isLoggedIn,Authenticate)
module.exports = app;
