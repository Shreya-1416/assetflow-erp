const bookingService = require("../services/bookingService");
const asyncHandler = require("../utils/asyncHandler");

const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking(req.user._id, req.body);
  res.status(201).json({
    success: true,
    data: booking
  });
});

const getBookings = asyncHandler(async (req, res) => {
  // Can filter by resource, bookedBy, status, etc.
  const bookings = await bookingService.getBookings(req.query);
  res.status(200).json({
    success: true,
    data: bookings
  });
});

const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.id, req.user._id, req.user.role);
  res.status(200).json({
    success: true,
    message: "Booking cancelled successfully",
    data: booking
  });
});

module.exports = {
  createBooking,
  getBookings,
  cancelBooking
};
