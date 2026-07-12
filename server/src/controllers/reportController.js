const reportService = require("../services/reportService");
const asyncHandler = require("../utils/asyncHandler");

const getAssetUtilization = asyncHandler(async (req, res) => {
  const data = await reportService.getAssetUtilization();
  res.status(200).json({ success: true, data });
});

const getMaintenanceFrequency = asyncHandler(async (req, res) => {
  const data = await reportService.getMaintenanceFrequency();
  res.status(200).json({ success: true, data });
});

const getDepartmentAllocationSummary = asyncHandler(async (req, res) => {
  const data = await reportService.getDepartmentAllocationSummary();
  res.status(200).json({ success: true, data });
});

module.exports = {
  getAssetUtilization,
  getMaintenanceFrequency,
  getDepartmentAllocationSummary
};
