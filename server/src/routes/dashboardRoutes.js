const express = require("express");
const router = express.Router();
const { getKPIs } = require("../controllers/dashboardController");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/kpis", getKPIs);

module.exports = router;
