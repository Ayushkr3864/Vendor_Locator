const express = require("express");
const userRegister = require("../../controllers/user/userRegistration.controller");
const upload = require("../../middleware/userImage")
const isLoggedIn = require("../../middleware/isLoggedIn");

const app = express.Router();
const userLogin = require("../../controllers/user/userLogin.controller")
const getUser = require("../../controllers/user/getUser.controller");
app.post("/register",upload.single("avatar"), userRegister);
app.post("/login", userLogin)
app.get("/get",isLoggedIn,getUser)
module.exports = app;
