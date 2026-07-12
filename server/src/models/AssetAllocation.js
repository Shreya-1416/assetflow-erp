const mongoose = require("mongoose");

const { ALLOCATION_STATUSES } = require("../utils/constants");

const allocationHistorySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: undefined
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: true
  }
);

const assetAllocationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },
    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    allocatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    expectedReturnDate: {
      type: Date,
      required: true
    },
    allocatedAt: {
      type: Date,
      default: Date.now
    },
    returnedAt: {
      type: Date,
      default: null
    },
    returnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    status: {
      type: String,
      enum: ALLOCATION_STATUSES,
      default: "Active"
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    },
    returnNotes: {
      type: String,
      trim: true,
      default: ""
    },
    history: {
      type: [allocationHistorySchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

assetAllocationSchema.index(
  { asset: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "Active"
    }
  }
);
assetAllocationSchema.index({ allocatedTo: 1, status: 1, expectedReturnDate: 1 });
assetAllocationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AssetAllocation", assetAllocationSchema);
