const mongoose = require("mongoose");

const ApiError = require("../utils/ApiError");
const { ALLOCATION_STATUSES, ASSET_CONDITIONS, TRANSFER_REQUEST_STATUSES } = require("../utils/constants");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const ensureObjectId = (value, fieldName) => {
  if (!value || !isValidObjectId(value)) {
    throw new ApiError(400, `${fieldName} must be a valid id`);
  }
};

const validateFutureDate = (value, fieldName) => {
  if (!value) {
    throw new ApiError(400, `${fieldName} is required`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, `${fieldName} must be a valid date`);
  }

  if (date <= new Date()) {
    throw new ApiError(400, `${fieldName} must be in the future`);
  }
};

const validateOptionalFutureDate = (value, fieldName) => {
  if (typeof value === "undefined" || value === null || value === "") {
    return;
  }

  validateFutureDate(value, fieldName);
};

const validatePagination = (query) => {
  const { page, limit } = query;

  if (typeof page !== "undefined" && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
    throw new ApiError(400, "page must be a positive integer");
  }

  if (typeof limit !== "undefined" && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
    throw new ApiError(400, "limit must be a positive integer");
  }
};

const validateAllocate = (body) => {
  ensureObjectId(body.assetId, "assetId");
  ensureObjectId(body.allocatedTo, "allocatedTo");
  validateFutureDate(body.expectedReturnDate, "expectedReturnDate");

  if (typeof body.notes !== "undefined" && typeof body.notes !== "string") {
    throw new ApiError(400, "notes must be a string");
  }
};

const validateReturn = (body) => {
  if (typeof body.condition !== "undefined" && !ASSET_CONDITIONS.includes(body.condition)) {
    throw new ApiError(400, "Invalid asset condition provided");
  }

  if (typeof body.location !== "undefined" && !String(body.location).trim()) {
    throw new ApiError(400, "location cannot be empty");
  }

  if (typeof body.notes !== "undefined" && typeof body.notes !== "string") {
    throw new ApiError(400, "notes must be a string");
  }
};

const validateTransferRequest = (body) => {
  ensureObjectId(body.allocationId, "allocationId");
  ensureObjectId(body.toUser, "toUser");
  validateOptionalFutureDate(body.expectedReturnDate, "expectedReturnDate");

  if (typeof body.reason !== "undefined" && typeof body.reason !== "string") {
    throw new ApiError(400, "reason must be a string");
  }
};

const validateDecision = (body) => {
  if (typeof body.decisionNote !== "undefined" && typeof body.decisionNote !== "string") {
    throw new ApiError(400, "decisionNote must be a string");
  }
};

const validateAllocationFilters = (query) => {
  validatePagination(query);

  if (typeof query.status !== "undefined" && !ALLOCATION_STATUSES.includes(query.status)) {
    throw new ApiError(400, "Invalid allocation status filter");
  }

  if (typeof query.assetId !== "undefined") {
    ensureObjectId(query.assetId, "assetId");
  }

  if (typeof query.allocatedTo !== "undefined") {
    ensureObjectId(query.allocatedTo, "allocatedTo");
  }
};

const validateTransferFilters = (query) => {
  validatePagination(query);

  if (typeof query.status !== "undefined" && !TRANSFER_REQUEST_STATUSES.includes(query.status)) {
    throw new ApiError(400, "Invalid transfer request status filter");
  }

  if (typeof query.assetId !== "undefined") {
    ensureObjectId(query.assetId, "assetId");
  }

  if (typeof query.fromUser !== "undefined") {
    ensureObjectId(query.fromUser, "fromUser");
  }

  if (typeof query.toUser !== "undefined") {
    ensureObjectId(query.toUser, "toUser");
  }
};

const validateId = (params, fieldName = "id") => {
  ensureObjectId(params.id, fieldName);
};

const validateAllocation = (type) => {
  return (req, res, next) => {
    try {
      if (type === "allocate") {
        validateAllocate(req.body);
      }

      if (type === "return") {
        validateId(req.params, "allocation id");
        validateReturn(req.body);
      }

      if (type === "transferRequest") {
        validateTransferRequest(req.body);
      }

      if (type === "transferDecision") {
        validateId(req.params, "transfer request id");
        validateDecision(req.body);
      }

      if (type === "allocationId") {
        validateId(req.params, "allocation id");
      }

      if (type === "transferId") {
        validateId(req.params, "transfer request id");
      }

      if (type === "listAllocations") {
        validateAllocationFilters(req.query);
      }

      if (type === "listTransfers") {
        validateTransferFilters(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateAllocation;
