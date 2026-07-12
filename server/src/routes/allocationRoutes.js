const express = require("express");

const allocationController = require("../controllers/allocationController");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const validateAllocation = require("../validations/allocationValidation");

const router = express.Router();

router.use(auth);

router.get(
  "/",
  allowRoles("Admin", "Asset Manager", "Department Head"),
  validateAllocation("listAllocations"),
  allocationController.listAllocations
);
router.get(
  "/transfers",
  allowRoles("Admin", "Asset Manager", "Department Head"),
  validateAllocation("listTransfers"),
  allocationController.listTransferRequests
);
router.get(
  "/transfers/:id",
  allowRoles("Admin", "Asset Manager", "Department Head"),
  validateAllocation("transferId"),
  allocationController.getTransferRequestById
);
router.post(
  "/",
  allowRoles("Admin", "Asset Manager"),
  validateAllocation("allocate"),
  allocationController.allocateAsset
);
router.post(
  "/transfers",
  allowRoles("Admin", "Asset Manager", "Department Head"),
  validateAllocation("transferRequest"),
  allocationController.requestTransfer
);
router.patch(
  "/transfers/:id/approve",
  allowRoles("Admin", "Asset Manager"),
  validateAllocation("transferDecision"),
  allocationController.approveTransfer
);
router.patch(
  "/transfers/:id/reject",
  allowRoles("Admin", "Asset Manager"),
  validateAllocation("transferDecision"),
  allocationController.rejectTransfer
);
router.get(
  "/:id",
  allowRoles("Admin", "Asset Manager", "Department Head"),
  validateAllocation("allocationId"),
  allocationController.getAllocationById
);
router.patch(
  "/:id/return",
  allowRoles("Admin", "Asset Manager"),
  validateAllocation("return"),
  allocationController.returnAsset
);

module.exports = router;
