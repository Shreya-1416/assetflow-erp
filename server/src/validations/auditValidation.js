const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const { AUDIT_ITEM_STATUSES } = require("../utils/constants");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateAuditCycleId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid audit cycle id");
  }
};

const validateCreateCycle = (body) => {
  const { name, startDate, endDate, assignedAuditors } = body;
  
  if (!name || !String(name).trim()) {
    throw new ApiError(400, "name is required");
  }
  
  if (!startDate || !endDate) {
    throw new ApiError(400, "startDate and endDate are required");
  }
  
  if (new Date(startDate) >= new Date(endDate)) {
    throw new ApiError(400, "endDate must be after startDate");
  }
  
  if (!Array.isArray(assignedAuditors) || assignedAuditors.length === 0) {
    throw new ApiError(400, "At least one assignedAuditor is required");
  }
  
  for (const auditor of assignedAuditors) {
    if (!isValidObjectId(auditor)) {
      throw new ApiError(400, "Invalid auditor id in assignedAuditors");
    }
  }
};

const validateVerifyItem = (body) => {
  const { status } = body;
  if (!status || !AUDIT_ITEM_STATUSES.includes(status)) {
    throw new ApiError(400, "Invalid audit item status");
  }
};

const validateAudit = (type) => {
  return (req, res, next) => {
    try {
      if (type === "createCycle") {
        validateCreateCycle(req.body);
      }
      if (type === "id" || type === "verifyItem" || type === "closeCycle" || type === "report") {
        validateAuditCycleId(req.params);
      }
      if (type === "verifyItem") {
        if (!isValidObjectId(req.params.itemId)) {
          throw new ApiError(400, "Invalid audit item id");
        }
        validateVerifyItem(req.body);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateAudit;
