const assetService = require("../services/assetService");
const asyncHandler = require("../utils/asyncHandler");

const registerAsset = asyncHandler(async (req, res) => {
  const asset = await assetService.registerAsset({
    body: req.body,
    files: req.files,
    actor: req.user
  });

  res.status(201).json({
    success: true,
    message: "Asset registered successfully",
    data: {
      asset
    }
  });
});

const updateAsset = asyncHandler(async (req, res) => {
  const asset = await assetService.updateAsset({
    assetId: req.params.id,
    body: req.body,
    files: req.files,
    actor: req.user
  });

  res.status(200).json({
    success: true,
    message: "Asset updated successfully",
    data: {
      asset
    }
  });
});

const softDeleteAsset = asyncHandler(async (req, res) => {
  const asset = await assetService.softDeleteAsset({
    assetId: req.params.id,
    actor: req.user
  });

  res.status(200).json({
    success: true,
    message: "Asset deleted successfully",
    data: {
      asset
    }
  });
});

const getAssetById = asyncHandler(async (req, res) => {
  const asset = await assetService.getAssetById(req.params.id, req.query.includeDeleted);

  res.status(200).json({
    success: true,
    data: {
      asset
    }
  });
});

const getAssetHistory = asyncHandler(async (req, res) => {
  const result = await assetService.getAssetHistory(req.params.id, req.query.includeDeleted);

  res.status(200).json({
    success: true,
    data: result
  });
});

const listAssets = asyncHandler(async (req, res) => {
  const result = await assetService.listAssets(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

module.exports = {
  registerAsset,
  updateAsset,
  softDeleteAsset,
  getAssetById,
  getAssetHistory,
  listAssets
};
