const mongoose = require("mongoose");

const ApiError = require("../utils/ApiError");
const { USER_ROLES, USER_ROLE_RANK } = require("../utils/constants");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateEmployeeId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid employee id");
  }
};

const validatePagination = (query) => {
  const { page, limit, isActive, role, department, search } = query;

  if (typeof page !== "undefined" && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
    throw new ApiError(400, "page must be a positive integer");
  }

  if (typeof limit !== "undefined" && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
    throw new ApiError(400, "limit must be a positive integer");
  }

  if (typeof isActive !== "undefined" && !["true", "false"].includes(String(isActive))) {
    throw new ApiError(400, "isActive must be either true or false");
  }

  if (typeof role !== "undefined" && !USER_ROLES.includes(role)) {
    throw new ApiError(400, "Invalid role filter provided");
  }

  if (typeof department !== "undefined" && !String(department).trim()) {
    throw new ApiError(400, "department filter cannot be empty");
  }

  if (typeof search !== "undefined" && typeof search !== "string") {
    throw new ApiError(400, "search must be a string");
  }
};

const validateAssignDepartment = (body) => {
  if (!body.department || !String(body.department).trim()) {
    throw new ApiError(400, "Department is required");
  }
};

const validateRoleChange = (body, direction) => {
  const { role } = body;

  if (!role || !USER_ROLES.includes(role)) {
    throw new ApiError(400, "A valid role is required");
  }

  if (direction === "promote" && USER_ROLE_RANK[role] <= USER_ROLE_RANK.Employee) {
    throw new ApiError(400, "Promotion target role must be above Employee");
  }

  if (direction === "demote" && role === "Admin") {
    throw new ApiError(400, "Demotion target role cannot be Admin");
  }
};

const validateEmployee = (type) => {
  return (req, res, next) => {
    try {
      if (type === "list") {
        validatePagination(req.query);
      }

      if (type === "id") {
        validateEmployeeId(req.params);
      }

      if (type === "assignDepartment") {
        validateEmployeeId(req.params);
        validateAssignDepartment(req.body);
      }

      if (type === "promote") {
        validateEmployeeId(req.params);
        validateRoleChange(req.body, "promote");
      }

      if (type === "demote") {
        validateEmployeeId(req.params);
        validateRoleChange(req.body, "demote");
      }

      if (type === "activate" || type === "deactivate") {
        validateEmployeeId(req.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateEmployee;
