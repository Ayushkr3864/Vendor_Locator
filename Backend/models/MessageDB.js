const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },

    senderModel: {
      type: String,
      required: true,
      enum: ["User", "Vendor"],
    },

    text: {
      type: String,
      trim: true,
    },

    attachments: [
      {
        url: String,
        type: String, // image, pdf, etc
      },
    ],

    delivered: {
      type: Boolean,
      default: false,
    },

    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// 🔥 Index for fast message fetching
messageSchema.index({ chatRoom: 1, createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
