const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    lastMessageAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

/**
 * 🔥 Important Index
 * Prevents duplicate chat rooms between same user & vendor
 */
chatRoomSchema.index({ user: 1, vendor: 1 }, { unique: true });

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
