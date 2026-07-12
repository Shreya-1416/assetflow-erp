const mongoose = require("mongoose");

const ApiError = require("../utils/ApiError");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const ensureMetadata = (metadata) => {
  if (typeof metadata === "undefined") {
    return;
  }

  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new ApiError(400, "metadata must be a valid object");
  }
};

const validateCreateCategory = (body) => {
  const { name, description, metadata } = body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Category name is required");
  }

  if (typeof description !== "undefined" && typeof description !== "string") {
    throw new ApiError(400, "Description must be a string");
  }

  ensureMetadata(metadata);
};

const validateUpdateCategory = (body) => {
  const { name, description, metadata, isActive } = body;

  if (
    typeof name === "undefined" &&
    typeof description === "undefined" &&
    typeof metadata === "undefined" &&
    typeof isActive === "undefined"
  ) {
    throw new ApiError(400, "At least one field is required to update the category");
  }

  if (typeof name !== "undefined" && !String(name).trim()) {
    throw new ApiError(400, "Category name cannot be empty");
  }

  if (typeof description !== "undefined" && typeof description !== "string") {
    throw new ApiError(400, "Description must be a string");
  }

  if (typeof isActive !== "undefined" && typeof isActive !== "boolean") {
    throw new ApiError(400, "isActive must be a boolean value");
  }

  ensureMetadata(metadata);
};

const validateCategoryId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid category id");
  }
};

const validateListCategories = (query) => {
  const { page, limit, isActive } = query;

  if (typeof page !== "undefined" && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
    throw new ApiError(400, "page must be a positive integer");
  }

  if (typeof limit !== "undefined" && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
    throw new ApiError(400, "limit must be a positive integer");
  }

  if (typeof isActive !== "undefined" && !["true", "false"].includes(String(isActive))) {
    throw new ApiError(400, "isActive must be either true or false");
  }
};

const validateCategory = (type) => {
  return (req, res, next) => {
    try {
      if (type === "create") {
        validateCreateCategory(req.body);
      }

      if (type === "update") {
        validateCategoryId(req.params);
        validateUpdateCategory(req.body);
      }

      if (type === "id" || type === "deactivate") {
        validateCategoryId(req.params);
      }

      if (type === "list") {
        validateListCategories(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateCategory;
