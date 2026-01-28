const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const fetchProduct = require("../../controllers/vendor/fetchProduct.controller");
const app = express.Router();
const { apiLimiter } = require("../../rateLimiter/limiter");
app.get("/", apiLimiter, isLoggedIn, isVendor, fetchProduct);

module.exports = app;
