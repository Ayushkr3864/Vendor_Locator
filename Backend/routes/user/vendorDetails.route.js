const express = require("express");
const vendorDetails = require("../../controllers/user/vendorDetails.controller");

const app = express.Router();
const { apiLimiter } = require("../../rateLimiter/limiter");
app.get("/vendorDetails/:id", apiLimiter, vendorDetails);

module.exports = app;
