const auditService = require("../services/auditService");
const asyncHandler = require("../utils/asyncHandler");

const createAuditCycle = asyncHandler(async (req, res) => {
  const cycle = await auditService.createAuditCycle(req.user._id, req.body);
  res.status(201).json({
    success: true,
    data: cycle
  });
});

const getAuditCycles = asyncHandler(async (req, res) => {
  const cycles = await auditService.getCycles(req.query);
  res.status(200).json({
    success: true,
    data: cycles
  });
});

const getAuditCycleDetails = asyncHandler(async (req, res) => {
  const data = await auditService.getCycleDetails(req.params.id);
  res.status(200).json({
    success: true,
    data
  });
});

const verifyAuditItem = asyncHandler(async (req, res) => {
  const item = await auditService.verifyItem(req.params.id, req.params.itemId, req.user._id, req.body);
  res.status(200).json({
    success: true,
    message: "Audit item verified",
    data: item
  });
});

const generateDiscrepancyReport = asyncHandler(async (req, res) => {
  const report = await auditService.generateDiscrepancyReport(req.params.id);
  res.status(200).json({
    success: true,
    data: report
  });
});

const closeAuditCycle = asyncHandler(async (req, res) => {
  const cycle = await auditService.closeCycle(req.params.id, req.user._id);
  res.status(200).json({
    success: true,
    message: "Audit cycle closed successfully",
    data: cycle
  });
});

module.exports = {
  createAuditCycle,
  getAuditCycles,
  getAuditCycleDetails,
  verifyAuditItem,
  generateDiscrepancyReport,
  closeAuditCycle
};
