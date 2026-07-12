const express = require("express");
const router = express.Router();
const {
  getAssetUtilization,
  getMaintenanceFrequency,
  getDepartmentAllocationSummary
} = require("../controllers/reportController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/roles");

router.use(auth);
router.use(authorize("Admin", "Asset Manager", "Department Head"));

router.get("/asset-utilization", getAssetUtilization);
router.get("/maintenance-frequency", getMaintenanceFrequency);
router.get("/department-allocation", getDepartmentAllocationSummary);

module.exports = router;
