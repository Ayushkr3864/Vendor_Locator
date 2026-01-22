const express = require("express")
const vendorDetails = require("../../controllers/vendor/vendorDetails.controller")

const app = express.Router()

app.get("/vendorDetails/:id", vendorDetails);

module.exports = app