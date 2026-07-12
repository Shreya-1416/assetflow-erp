const mongoose = require("mongoose");

const { TRANSFER_REQUEST_STATUSES } = require("../utils/constants");

const assetTransferRequestSchema = new mongoose.Schema(
  {
    allocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetAllocation",
      required: true
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    status: {
      type: String,
      enum: TRANSFER_REQUEST_STATUSES,
      default: "Pending"
    },
    reason: {
      type: String,
      trim: true,
      default: ""
    },
    decisionNote: {
      type: String,
      trim: true,
      default: ""
    },
    expectedReturnDate: {
      type: Date,
      default: null
    },
    decidedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

assetTransferRequestSchema.index(
  { asset: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "Pending"
    }
  }
);
assetTransferRequestSchema.index({ fromUser: 1, status: 1 });
assetTransferRequestSchema.index({ toUser: 1, status: 1 });
assetTransferRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AssetTransferRequest", assetTransferRequestSchema);
