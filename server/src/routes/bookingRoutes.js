const express = require("express");
const router = express.Router();

const { createBooking, getBookings, cancelBooking } = require("../controllers/bookingController");
const validateBooking = require("../validations/bookingValidation");
const auth = require("../middleware/auth");

router.use(auth);

router.post("/", validateBooking("create"), createBooking);
router.get("/", getBookings);
router.patch("/:id/cancel", validateBooking("cancel"), cancelBooking);

module.exports = router;
