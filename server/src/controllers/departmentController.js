const departmentService = require("../services/departmentService");
const asyncHandler = require("../utils/asyncHandler");

const createDepartment = asyncHandler(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);

  res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: {
      department
    }
  });
});

const updateDepartment = asyncHandler(async (req, res) => {
  const department = await departmentService.updateDepartment(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Department updated successfully",
    data: {
      department
    }
  });
});

const assignDepartmentHead = asyncHandler(async (req, res) => {
  const department = await departmentService.assignDepartmentHead(req.params.id, req.body.headId);

  res.status(200).json({
    success: true,
    message: "Department head assigned successfully",
    data: {
      department
    }
  });
});

const deactivateDepartment = asyncHandler(async (req, res) => {
  const department = await departmentService.deactivateDepartment(req.params.id);

  res.status(200).json({
    success: true,
    message: "Department deactivated successfully",
    data: {
      department
    }
  });
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      department
    }
  });
});

const listDepartments = asyncHandler(async (req, res) => {
  const result = await departmentService.listDepartments(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

module.exports = {
  createDepartment,
  updateDepartment,
  assignDepartmentHead,
  deactivateDepartment,
  getDepartmentById,
  listDepartments
};
