const express = require("express");
const userRegister = require("../../controllers/user/userRegistration.controller");

const app = express.Router();


app.post("/", userRegister);

module.exports = app;
