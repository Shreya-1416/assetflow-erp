const mongoose = require("mongoose");

const ApiError = require("../utils/ApiError");
const { ASSET_CONDITIONS, ASSET_STATUSES } = require("../utils/constants");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateAssetId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid asset id");
  }
};

const validateDateField = (value, fieldName) => {
  if (typeof value === "undefined" || value === "") {
    return;
  }

  if (Number.isNaN(new Date(value).getTime())) {
    throw new ApiError(400, `${fieldName} must be a valid date`);
  }
};

const validateIncludeDeleted = (query) => {
  if (typeof query.includeDeleted !== "undefined" && !["true", "false"].includes(String(query.includeDeleted))) {
    throw new ApiError(400, "includeDeleted must be either true or false");
  }
};

const validateCreateAsset = (body) => {
  const requiredFields = ["name", "serialNumber", "categoryId", "departmentId", "location"];

  for (const field of requiredFields) {
    if (!body[field] || !String(body[field]).trim()) {
      throw new ApiError(400, `${field} is required`);
    }
  }

  if (!isValidObjectId(body.categoryId)) {
    throw new ApiError(400, "categoryId must be a valid id");
  }

  if (!isValidObjectId(body.departmentId)) {
    throw new ApiError(400, "departmentId must be a valid id");
  }

  if (body.condition && !ASSET_CONDITIONS.includes(body.condition)) {
    throw new ApiError(400, "Invalid asset condition provided");
  }

  if (body.status && !ASSET_STATUSES.includes(body.status)) {
    throw new ApiError(400, "Invalid asset status provided");
  }

  validateDateField(body.purchaseDate, "purchaseDate");
  validateDateField(body.warrantyExpiry, "warrantyExpiry");
};

const validateUpdateAsset = (body, files) => {
  const allowedFields = [
    "name",
    "serialNumber",
    "description",
    "manufacturer",
    "model",
    "categoryId",
    "departmentId",
    "location",
    "condition",
    "status",
    "purchaseDate",
    "warrantyExpiry"
  ];

  const hasBodyChanges = allowedFields.some((field) => typeof body[field] !== "undefined");
  const hasFileChanges = Array.isArray(files) && files.length > 0;

  if (!hasBodyChanges && !hasFileChanges) {
    throw new ApiError(400, "At least one asset field or photo upload is required");
  }

  if (typeof body.categoryId !== "undefined" && !isValidObjectId(body.categoryId)) {
    throw new ApiError(400, "categoryId must be a valid id");
  }

  if (typeof body.departmentId !== "undefined" && !isValidObjectId(body.departmentId)) {
    throw new ApiError(400, "departmentId must be a valid id");
  }

  if (typeof body.condition !== "undefined" && !ASSET_CONDITIONS.includes(body.condition)) {
    throw new ApiError(400, "Invalid asset condition provided");
  }

  if (typeof body.status !== "undefined" && !ASSET_STATUSES.includes(body.status)) {
    throw new ApiError(400, "Invalid asset status provided");
  }

  validateDateField(body.purchaseDate, "purchaseDate");
  validateDateField(body.warrantyExpiry, "warrantyExpiry");
};

const validateListAssets = (query) => {
  const { page, limit, sortOrder, status, condition, categoryId, departmentId, includeDeleted } = query;

  if (typeof page !== "undefined" && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
    throw new ApiError(400, "page must be a positive integer");
  }

  if (typeof limit !== "undefined" && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
    throw new ApiError(400, "limit must be a positive integer");
  }

  if (typeof sortOrder !== "undefined" && !["asc", "desc"].includes(String(sortOrder).toLowerCase())) {
    throw new ApiError(400, "sortOrder must be either asc or desc");
  }

  if (typeof status !== "undefined" && !ASSET_STATUSES.includes(status)) {
    throw new ApiError(400, "Invalid status filter provided");
  }

  if (typeof condition !== "undefined" && !ASSET_CONDITIONS.includes(condition)) {
    throw new ApiError(400, "Invalid condition filter provided");
  }

  if (typeof categoryId !== "undefined" && !isValidObjectId(categoryId)) {
    throw new ApiError(400, "categoryId filter must be a valid id");
  }

  if (typeof departmentId !== "undefined" && !isValidObjectId(departmentId)) {
    throw new ApiError(400, "departmentId filter must be a valid id");
  }

  validateIncludeDeleted({ includeDeleted });
};

const validateAsset = (type) => {
  return (req, res, next) => {
    try {
      if (type === "create") {
        validateCreateAsset(req.body);
      }

      if (type === "update") {
        validateAssetId(req.params);
        validateUpdateAsset(req.body, req.files);
      }

      if (type === "id" || type === "history" || type === "delete") {
        validateAssetId(req.params);
      }

      if (type === "id" || type === "history") {
        validateIncludeDeleted(req.query);
      }

      if (type === "list") {
        validateListAssets(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateAsset;
