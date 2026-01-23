const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    /* =========================
       PHASE 1 – REGISTRATION
    ========================== */

    name: {
      type: String, // Shop / Business Name
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    vendorimg: {
      type: String,
    },
    role:{type:String,default:"user"},

    /* =========================
       PHASE 2 – BUSINESS DETAILS
    ========================== */

    category: {
      type: String,
      enum: [
        "Grocery",
        "Vegetables & Fruits",
        "Bakery",
        "Meat & Fish",
        "Dairy",
        "Pharmacy",
        "Hardware",
        "Electronics",
        "Clothing",
        "Stationery",
        "Salon & Beauty",
        "Repair Services",
        "Restaurant",
        "Cafe",
        "Other",
      ],
    },
    description: {
      type: String,
      maxlength: 300,
    },
    address: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    shopImage: {
      type: String,
      default: "", // Shop images URLs
    },
    /* =========================
       STATUS & FLAGS
    ========================== */

    isProfileComplete: {
      type: Boolean,
      default: false, // map pe tabhi dikhe jab true
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* =========================
   INDEXES
========================== */

// Geo index for nearby vendor search
vendorSchema.index({ location: "2dsphere" });
vendorSchema.index({ email: 1, });
vendorSchema.index({ createdAt: 1 });
module.exports = mongoose.model("Vendor", vendorSchema);
