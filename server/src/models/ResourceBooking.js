const mongoose = require("mongoose");
const { BOOKING_STATUSES } = require("../utils/constants");

const resourceBookingSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "Upcoming"
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Basic validation for dates
resourceBookingSchema.pre("validate", function(next) {
  if (this.startTime >= this.endTime) {
    this.invalidate("endTime", "End time must be after start time");
  }
  next();
});

module.exports = mongoose.model("ResourceBooking", resourceBookingSchema);
