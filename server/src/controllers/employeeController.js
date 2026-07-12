const employeeService = require("../services/employeeService");
const asyncHandler = require("../utils/asyncHandler");

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      employee
    }
  });
});

const listEmployees = asyncHandler(async (req, res) => {
  const result = await employeeService.listEmployees(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

const assignDepartment = asyncHandler(async (req, res) => {
  const employee = await employeeService.assignDepartment(req.params.id, req.body.department);

  res.status(200).json({
    success: true,
    message: "Department assigned successfully",
    data: {
      employee
    }
  });
});

const promoteEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.promoteEmployee(req.user, req.params.id, req.body.role);

  res.status(200).json({
    success: true,
    message: "Employee promoted successfully",
    data: {
      employee
    }
  });
});

const demoteEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.demoteEmployee(req.user, req.params.id, req.body.role);

  res.status(200).json({
    success: true,
    message: "Employee demoted successfully",
    data: {
      employee
    }
  });
});

const activateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.activateEmployee(req.params.id);

  res.status(200).json({
    success: true,
    message: "Employee activated successfully",
    data: {
      employee
    }
  });
});

const deactivateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.deactivateEmployee(req.params.id);

  res.status(200).json({
    success: true,
    message: "Employee deactivated successfully",
    data: {
      employee
    }
  });
});

module.exports = {
  getEmployeeById,
  listEmployees,
  assignDepartment,
  promoteEmployee,
  demoteEmployee,
  activateEmployee,
  deactivateEmployee
};
