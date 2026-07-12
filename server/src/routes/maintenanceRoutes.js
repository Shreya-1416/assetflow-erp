const express = require("express");
const router = express.Router();

const { createRequest, getRequests, getRequestById, updateRequestStatus } = require("../controllers/maintenanceController");
const validateMaintenance = require("../validations/maintenanceValidation");
const auth = require("../middleware/auth");
const authorize = require("../middleware/roles");

router.use(auth);

router.post("/", validateMaintenance("create"), createRequest);
router.get("/", getRequests);
router.get("/:id", validateMaintenance("id"), getRequestById);

// Updating status requires Asset Manager or Admin
router.patch("/:id/status", authorize("Admin", "Asset Manager"), validateMaintenance("update"), updateRequestStatus);

module.exports = router;
