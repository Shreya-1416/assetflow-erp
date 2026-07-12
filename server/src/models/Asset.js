const mongoose = require("mongoose");

const { ASSET_CONDITIONS, ASSET_HISTORY_ACTIONS, ASSET_STATUSES } = require("../utils/constants");

const assetPhotoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true
    },
    filename: {
      type: String,
      required: true,
      trim: true
    },
    originalName: {
      type: String,
      required: true,
      trim: true
    },
    mimeType: {
      type: String,
      required: true,
      trim: true
    },
    size: {
      type: Number,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: false
  }
);

const assetHistorySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ASSET_HISTORY_ACTIONS,
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    changes: {
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

const assetSchema = new mongoose.Schema(
  {
    assetTag: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    serialNumber: {
      type: String,
      required: true,
      trim: true
    },
    normalizedSerialNumber: {
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
    manufacturer: {
      type: String,
      trim: true,
      default: ""
    },
    model: {
      type: String,
      trim: true,
      default: ""
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    condition: {
      type: String,
      enum: ASSET_CONDITIONS,
      default: "Good"
    },
    status: {
      type: String,
      enum: ASSET_STATUSES,
      default: "Available"
    },
    purchaseDate: {
      type: Date,
      default: null
    },
    warrantyExpiry: {
      type: Date,
      default: null
    },
    qrCode: {
      value: {
        type: String,
        required: true,
        trim: true
      },
      dataUrl: {
        type: String,
        required: true
      },
      generatedAt: {
        type: Date,
        default: Date.now
      }
    },
    photos: {
      type: [assetPhotoSchema],
      default: []
    },
    history: {
      type: [assetHistorySchema],
      default: []
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

assetSchema.pre("validate", function normalizeAssetFields(next) {
  if (this.serialNumber) {
    this.serialNumber = this.serialNumber.trim();
    this.normalizedSerialNumber = this.serialNumber.toLowerCase();
  }

  if (this.name) {
    this.name = this.name.trim();
  }

  if (this.location) {
    this.location = this.location.trim();
  }

  return next();
});

assetSchema.index({ category: 1, department: 1, status: 1, condition: 1, isDeleted: 1 });
assetSchema.index({ createdAt: -1, isDeleted: 1 });
assetSchema.index({ name: "text", assetTag: "text", serialNumber: "text", manufacturer: "text", model: "text", location: "text", description: "text" });

module.exports = mongoose.model("Asset", assetSchema);
