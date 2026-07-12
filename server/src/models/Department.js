const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    normalizedName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    deactivatedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

departmentSchema.pre("validate", function normalizeDepartmentName(next) {
  if (this.name) {
    this.name = this.name.trim();
    this.normalizedName = this.name.toLowerCase();
  }

  return next();
});

departmentSchema.index(
  { head: 1 },
  {
    unique: true,
    partialFilterExpression: {
      head: { $type: "objectId" }
    }
  }
);

module.exports = mongoose.model("Department", departmentSchema);
