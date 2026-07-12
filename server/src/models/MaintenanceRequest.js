const mongoose = require("mongoose");
const { MAINTENANCE_STATUSES } = require("../utils/constants");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    issueDescription: {
      type: String,
      required: true,
      trim: true
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },
    photoUrl: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: MAINTENANCE_STATUSES,
      default: "Pending"
    },
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    resolutionNotes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
