const mongoose = require("mongoose");

const { NOTIFICATION_EVENT_TYPES } = require("../utils/constants");

const notificationEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: NOTIFICATION_EVENT_TYPES,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    recipients: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      default: []
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    payload: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: undefined
    },
    readBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

notificationEventSchema.index({ recipients: 1, createdAt: -1 });
notificationEventSchema.index({ type: 1, createdAt: -1 });

module.exports = mongoose.model("NotificationEvent", notificationEventSchema);
