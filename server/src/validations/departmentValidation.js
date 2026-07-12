const mongoose = require("mongoose");

const ApiError = require("../utils/ApiError");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateCreateDepartment = (body) => {
  const { name, description, headId } = body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Department name is required");
  }

  if (typeof description !== "undefined" && typeof description !== "string") {
    throw new ApiError(400, "Description must be a string");
  }

  if (typeof headId !== "undefined" && headId !== null && !isValidObjectId(headId)) {
    throw new ApiError(400, "A valid headId is required");
  }
};

const validateUpdateDepartment = (body) => {
  const { name, description, headId, isActive } = body;

  if (
    typeof name === "undefined" &&
    typeof description === "undefined" &&
    typeof headId === "undefined" &&
    typeof isActive === "undefined"
  ) {
    throw new ApiError(400, "At least one field is required to update the department");
  }

  if (typeof name !== "undefined" && !String(name).trim()) {
    throw new ApiError(400, "Department name cannot be empty");
  }

  if (typeof description !== "undefined" && typeof description !== "string") {
    throw new ApiError(400, "Description must be a string");
  }

  if (typeof headId !== "undefined" && headId !== null && !isValidObjectId(headId)) {
    throw new ApiError(400, "A valid headId is required");
  }

  if (typeof isActive !== "undefined" && typeof isActive !== "boolean") {
    throw new ApiError(400, "isActive must be a boolean value");
  }
};

const validateDepartmentId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid department id");
  }
};

const validateAssignDepartmentHead = (body) => {
  if (!body.headId || !isValidObjectId(body.headId)) {
    throw new ApiError(400, "A valid headId is required");
  }
};

const validateListDepartments = (query) => {
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

const validateDepartment = (type) => {
  return (req, res, next) => {
    try {
      if (type === "create") {
        validateCreateDepartment(req.body);
      }

      if (type === "update") {
        validateDepartmentId(req.params);
        validateUpdateDepartment(req.body);
      }

      if (type === "assignHead") {
        validateDepartmentId(req.params);
        validateAssignDepartmentHead(req.body);
      }

      if (type === "id") {
        validateDepartmentId(req.params);
      }

      if (type === "list") {
        validateListDepartments(req.query);
      }

      if (type === "deactivate") {
        validateDepartmentId(req.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateDepartment;
