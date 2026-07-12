const mongoose = require("mongoose");
const { AUDIT_ITEM_STATUSES } = require("../utils/constants");

const auditItemSchema = new mongoose.Schema(
  {
    auditCycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuditCycle",
      required: true
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },
    status: {
      type: String,
      enum: AUDIT_ITEM_STATUSES,
      default: "Pending"
    },
    notes: {
      type: String,
      trim: true
    },
    auditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    auditedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Ensure one asset is only audited once per cycle
auditItemSchema.index({ auditCycle: 1, asset: 1 }, { unique: true });

module.exports = mongoose.model("AuditItem", auditItemSchema);
