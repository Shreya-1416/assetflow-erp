const NotificationEvent = require("../models/NotificationEvent");
const ActivityLog = require("../models/ActivityLog");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await NotificationEvent.find({ recipient: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
    
  res.status(200).json({
    success: true,
    data: notifications
  });
});

const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await NotificationEvent.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { readAt: new Date() },
    { new: true }
  );
  
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }
  
  res.status(200).json({
    success: true,
    data: notification
  });
});

const getAuditLogs = asyncHandler(async (req, res) => {
  // Activity logs are system wide for admins
  const logs = await ActivityLog.find({})
    .populate("actor", "name email role")
    .populate("targetAsset", "name assetTag")
    .sort({ createdAt: -1 })
    .limit(100);
    
  res.status(200).json({
    success: true,
    data: logs
  });
});

module.exports = {
  getMyNotifications,
  markNotificationRead,
  getAuditLogs
};
