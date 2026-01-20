const mongoose = require("mongoose");

const productSchema = mongoose.createSchema({
  productName: {
    type: String,
  },
  price: {
    type: String,
  },
  available: {
    type: Boolean,
  },
  tag: {
    type: String,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});