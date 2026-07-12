const express = require("express");
const router = express.Router();

const {
  createAuditCycle,
  getAuditCycles,
  getAuditCycleDetails,
  verifyAuditItem,
  generateDiscrepancyReport,
  closeAuditCycle
} = require("../controllers/auditController");
const validateAudit = require("../validations/auditValidation");
const auth = require("../middleware/auth");
const authorize = require("../middleware/roles");

router.use(auth);

// Only Admin/Asset Manager can create or close cycles
router.post("/", authorize("Admin", "Asset Manager"), validateAudit("createCycle"), createAuditCycle);
router.get("/", getAuditCycles);
router.get("/:id", validateAudit("id"), getAuditCycleDetails);

// Auditors can verify items
router.patch("/:id/items/:itemId", validateAudit("verifyItem"), verifyAuditItem);

// Discrepancy report
router.get("/:id/report", validateAudit("report"), generateDiscrepancyReport);

// Close cycle
router.post("/:id/close", authorize("Admin", "Asset Manager"), validateAudit("closeCycle"), closeAuditCycle);

module.exports = router;
