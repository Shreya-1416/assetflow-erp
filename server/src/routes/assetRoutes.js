const express = require("express");

const assetController = require("../controllers/assetController");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const assetUpload = require("../middleware/assetUpload");
const validateAsset = require("../validations/assetValidation");

const router = express.Router();

router.use(auth);

router.get("/", allowRoles("Admin", "Asset Manager", "Department Head"), validateAsset("list"), assetController.listAssets);
router.get("/:id", allowRoles("Admin", "Asset Manager", "Department Head"), validateAsset("id"), assetController.getAssetById);
router.get("/:id/history", allowRoles("Admin", "Asset Manager", "Department Head"), validateAsset("history"), assetController.getAssetHistory);
router.post("/", allowRoles("Admin", "Asset Manager"), assetUpload.array("photos", 5), validateAsset("create"), assetController.registerAsset);
router.patch("/:id", allowRoles("Admin", "Asset Manager"), assetUpload.array("photos", 5), validateAsset("update"), assetController.updateAsset);
router.delete("/:id", allowRoles("Admin", "Asset Manager"), validateAsset("delete"), assetController.softDeleteAsset);

module.exports = router;
