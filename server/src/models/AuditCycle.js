const mongoose = require("mongoose");
const { AUDIT_CYCLE_STATUSES } = require("../utils/constants");

const auditCycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    scope: {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
      },
      location: {
        type: String,
        trim: true
      }
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    assignedAuditors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    status: {
      type: String,
      enum: AUDIT_CYCLE_STATUSES,
      default: "Open"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AuditCycle", auditCycleSchema);
