const express = require("express");

const departmentController = require("../controllers/departmentController");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const validateDepartment = require("../validations/departmentValidation");

const router = express.Router();

router.use(auth);
router.use(allowRoles("Admin"));

router.get("/", validateDepartment("list"), departmentController.listDepartments);
router.get("/:id", validateDepartment("id"), departmentController.getDepartmentById);
router.post("/", validateDepartment("create"), departmentController.createDepartment);
router.patch("/:id", validateDepartment("update"), departmentController.updateDepartment);
router.patch("/:id/head", validateDepartment("assignHead"), departmentController.assignDepartmentHead);
router.patch("/:id/deactivate", validateDepartment("deactivate"), departmentController.deactivateDepartment);

module.exports = router;
