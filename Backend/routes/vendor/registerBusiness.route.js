const express = require("express");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const registerBusiness = require("../../controllers/vendor/registerBusiness.controller");
const shopUpload = require("../../middleware/productImage");
const upload = require("../../middleware/upload");
const app = express.Router();
const { apiLimiter, registerLimiter } = require("../../rateLimiter/limiter");
app.put(
  "/registerBusiness/:id",
  registerLimiter,
  isLoggedIn,
  isVendor,
  upload.single("shopImage"),
  registerBusiness,
);

module.exports = app;
