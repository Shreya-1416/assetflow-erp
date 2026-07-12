const express = require("express");

const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const validateCategory = require("../validations/categoryValidation");

const router = express.Router();

router.use(auth);

router.get("/", validateCategory("list"), categoryController.listCategories);
router.get("/:id", validateCategory("id"), categoryController.getCategoryById);
router.post("/", allowRoles("Admin", "Asset Manager"), validateCategory("create"), categoryController.createCategory);
router.patch("/:id", allowRoles("Admin", "Asset Manager"), validateCategory("update"), categoryController.updateCategory);
router.patch("/:id/deactivate", allowRoles("Admin", "Asset Manager"), validateCategory("deactivate"), categoryController.deactivateCategory);
router.delete("/:id", allowRoles("Admin", "Asset Manager"), validateCategory("deactivate"), categoryController.deactivateCategory);

module.exports = router;
