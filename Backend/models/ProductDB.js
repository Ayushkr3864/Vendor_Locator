const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
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
      type: [String],
      enum: [
        "new",
        "popular",
        "featured",
        "bestseller",
        "trending",
        "veg",
        "non-veg",
        "premium",
        "budget",
        "discounted",
        "on-sale",
        "free-delivery",
        "same-day-delivery",
        "local-vendor",
        "verified-vendor",
        "eco-friendly",
        "handcrafted",
      ],
      default: [],
    },
    productImage: {
      type: String,
      default: "",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    quantity:{type:String}
  },
  {
    timestamps: true,
  },
);
productSchema.index({ vendorId: 1, price: 1, createdAt: -1 });

module.exports = mongoose.model("Product",productSchema)