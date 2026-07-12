const express = require("express");
const router = express.Router();

const {
  getMyNotifications,
  markNotificationRead,
  getAuditLogs
} = require("../controllers/logNotificationController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/roles");

router.use(auth);

// Notifications for everyone
router.get("/notifications", getMyNotifications);
router.patch("/notifications/:id/read", markNotificationRead);

// Audit logs only for Admin
router.get("/logs", authorize("Admin"), getAuditLogs);

module.exports = router;
