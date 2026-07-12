const express = require("express");

const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth");
const validateAuth = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validateAuth("register"), authController.register);
router.post("/login", validateAuth("login"), authController.login);
router.get("/me", auth, authController.getProfile);

module.exports = router;
