const allocationService = require("../services/allocationService");
const asyncHandler = require("../utils/asyncHandler");

const allocateAsset = asyncHandler(async (req, res) => {
  const allocation = await allocationService.allocateAsset({
    ...req.body,
    actor: req.user
  });

  res.status(201).json({
    success: true,
    message: "Asset allocated successfully",
    data: {
      allocation
    }
  });
});

const returnAsset = asyncHandler(async (req, res) => {
  const allocation = await allocationService.returnAsset({
    allocationId: req.params.id,
    ...req.body,
    actor: req.user
  });

  res.status(200).json({
    success: true,
    message: "Asset returned successfully",
    data: {
      allocation
    }
  });
});

const requestTransfer = asyncHandler(async (req, res) => {
  const transferRequest = await allocationService.requestTransfer({
    ...req.body,
    actor: req.user
  });

  res.status(201).json({
    success: true,
    message: "Transfer request created successfully",
    data: {
      transferRequest
    }
  });
});

const approveTransfer = asyncHandler(async (req, res) => {
  const transferRequest = await allocationService.approveTransfer({
    requestId: req.params.id,
    decisionNote: req.body.decisionNote,
    actor: req.user
  });

  res.status(200).json({
    success: true,
    message: "Transfer request approved successfully",
    data: {
      transferRequest
    }
  });
});

const rejectTransfer = asyncHandler(async (req, res) => {
  const transferRequest = await allocationService.rejectTransfer({
    requestId: req.params.id,
    decisionNote: req.body.decisionNote,
    actor: req.user
  });

  res.status(200).json({
    success: true,
    message: "Transfer request rejected successfully",
    data: {
      transferRequest
    }
  });
});

const getAllocationById = asyncHandler(async (req, res) => {
  const allocation = await allocationService.getAllocationById(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      allocation
    }
  });
});

const getTransferRequestById = asyncHandler(async (req, res) => {
  const transferRequest = await allocationService.getTransferRequestById(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      transferRequest
    }
  });
});

const listAllocations = asyncHandler(async (req, res) => {
  const result = await allocationService.listAllocations(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

const listTransferRequests = asyncHandler(async (req, res) => {
  const result = await allocationService.listTransferRequests(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

module.exports = {
  allocateAsset,
  returnAsset,
  requestTransfer,
  approveTransfer,
  rejectTransfer,
  getAllocationById,
  getTransferRequestById,
  listAllocations,
  listTransferRequests
};
