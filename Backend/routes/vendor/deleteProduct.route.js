const express = require("express");
const app = express.Router();
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const deleteProduct = require("../../controllers/vendor/deleteProduct");
const { apiLimiter } = require("../../rateLimiter/limiter");
app.delete(
  "/deleteProduct/:productId",
  apiLimiter,
  isLoggedIn,
  isVendor,
  deleteProduct,
);

module.exports = app;
