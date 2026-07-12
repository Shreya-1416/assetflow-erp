const fs = require("fs");
const path = require("path");
const multer = require("multer");

const ApiError = require("../utils/ApiError");

const uploadDirectory = path.join(__dirname, "..", "..", "uploads", "assets");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const safeBaseName = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9-_]/g, "-");
    cb(null, `${Date.now()}-${safeBaseName}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new ApiError(400, "Only image files are allowed for asset photos"));
    return;
  }

  cb(null, true);
};

const assetUpload = multer({
  storage,
  fileFilter,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = assetUpload;
