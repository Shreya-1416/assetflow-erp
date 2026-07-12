const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: undefined
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

categorySchema.pre("validate", function normalizeCategoryName(next) {
  if (this.name) {
    this.name = this.name.trim();
    this.normalizedName = this.name.toLowerCase();
  }

  return next();
});

module.exports = mongoose.model("Category", categorySchema);
