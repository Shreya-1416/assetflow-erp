const maintenanceService = require("../services/maintenanceService");
const asyncHandler = require("../utils/asyncHandler");

const createRequest = asyncHandler(async (req, res) => {
  const request = await maintenanceService.createRequest(req.user._id, req.body);
  res.status(201).json({
    success: true,
    data: request
  });
});

const getRequests = asyncHandler(async (req, res) => {
  const requests = await maintenanceService.getRequests(req.query);
  res.status(200).json({
    success: true,
    data: requests
  });
});

const getRequestById = asyncHandler(async (req, res) => {
  const request = await maintenanceService.getRequestById(req.params.id);
  res.status(200).json({
    success: true,
    data: request
  });
});

const updateRequestStatus = asyncHandler(async (req, res) => {
  const request = await maintenanceService.updateRequestStatus(req.params.id, req.body, req.user._id);
  res.status(200).json({
    success: true,
    message: "Maintenance request updated successfully",
    data: request
  });
});

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus
};
