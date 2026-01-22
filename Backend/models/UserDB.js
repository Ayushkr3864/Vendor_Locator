const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
    },

    // 🔐 Google Login Support (future proof)
    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
