const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const addProduct = require("../../controllers/vendor/addProduct.controller");
const productUpload = require("../../middleware/productImage");
const { apiLimiter } = require("../../rateLimiter/limiter");
const app = express.Router();

app.post(
  "/",
  apiLimiter,
  isLoggedIn,
  isVendor,
  productUpload.single("productImage"),
  addProduct,
);

module.exports = app;
