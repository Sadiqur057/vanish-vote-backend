const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    options: [
      {
        option: {
          type: String,
          required: [true, "Option is required"],
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    reactions: {
      like: {
        type: Number,
        default: 0,
      },
      trending: {
        type: Number,
        default: 0,
      },
    },
    comments: [
      {
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "closed"],
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", PollSchema);
