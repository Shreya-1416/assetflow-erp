const fs = require("fs");

const cleanupUploadedFiles = (files) => {
  const uploadedFiles = Array.isArray(files)
    ? files
    : Object.values(files || {}).flat();

  for (const file of uploadedFiles) {
    if (file.path) {
      fs.promises.unlink(file.path).catch(() => {});
    }
  }
};

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  cleanupUploadedFiles(req.files);

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
