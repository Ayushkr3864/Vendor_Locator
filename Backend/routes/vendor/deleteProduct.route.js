const express = require("express");
const app = express.Router()
const isLoggedIn = require("../../middleware/isLoggedIn");
const isVendor = require("../../middleware/vendorAuth");
const deleteProduct = require("../../controllers/vendor/deleteProduct")
app.delete("/deleteProduct/:productId",isLoggedIn,isVendor, deleteProduct)

module.exports = app