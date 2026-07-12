const express = require("express");

const employeeController = require("../controllers/employeeController");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const validateEmployee = require("../validations/employeeValidation");

const router = express.Router();

router.use(auth);

router.get("/", allowRoles("Admin", "Asset Manager", "Department Head"), validateEmployee("list"), employeeController.listEmployees);
router.get("/:id", allowRoles("Admin", "Asset Manager", "Department Head"), validateEmployee("id"), employeeController.getEmployeeById);
router.patch("/:id/department", allowRoles("Admin"), validateEmployee("assignDepartment"), employeeController.assignDepartment);
router.patch("/:id/promote", allowRoles("Admin"), validateEmployee("promote"), employeeController.promoteEmployee);
router.patch("/:id/demote", allowRoles("Admin"), validateEmployee("demote"), employeeController.demoteEmployee);
router.patch("/:id/activate", allowRoles("Admin"), validateEmployee("activate"), employeeController.activateEmployee);
router.patch("/:id/deactivate", allowRoles("Admin"), validateEmployee("deactivate"), employeeController.deactivateEmployee);

module.exports = router;
