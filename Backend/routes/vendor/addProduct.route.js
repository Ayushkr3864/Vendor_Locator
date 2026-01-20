const express = require("express")
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const addProduct = require("../../controllers/vendor/addProduct.controller");
const productUpload = require("../../middleware/productImage");

const app = express.Router()

app.post(
  "/",
  isLoggedIn,
  isVendor,
  productUpload.single("productImage"),
  addProduct,
);

module.exports = app