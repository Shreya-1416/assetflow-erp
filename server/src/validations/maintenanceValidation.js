const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const { MAINTENANCE_STATUSES } = require("../utils/constants");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateRequestId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid request id");
  }
};

const validateCreateRequest = (body) => {
  const { asset, issueDescription, priority } = body;
  
  if (!asset || !isValidObjectId(asset)) {
    throw new ApiError(400, "Valid asset id is required");
  }
  
  if (!issueDescription || !String(issueDescription).trim()) {
    throw new ApiError(400, "issueDescription is required");
  }
  
  if (priority && !["Low", "Medium", "High", "Critical"].includes(priority)) {
    throw new ApiError(400, "Invalid priority");
  }
};

const validateUpdateRequest = (body) => {
  const { status, assignedTechnician } = body;
  
  if (status && !MAINTENANCE_STATUSES.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  
  if (assignedTechnician && !isValidObjectId(assignedTechnician)) {
    throw new ApiError(400, "Invalid assignedTechnician id");
  }
};

const validateMaintenance = (type) => {
  return (req, res, next) => {
    try {
      if (type === "create") {
        validateCreateRequest(req.body);
      }
      if (type === "id" || type === "update") {
        validateRequestId(req.params);
      }
      if (type === "update") {
        validateUpdateRequest(req.body);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateMaintenance;
