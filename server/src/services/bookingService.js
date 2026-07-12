const bookingRepository = require("../repositories/bookingRepository");
const assetRepository = require("../repositories/assetRepository");
const ApiError = require("../utils/ApiError");

class BookingService {
  async createBooking(userId, bookingData) {
    const { resource, startTime, endTime, notes } = bookingData;
    
    // Check if resource exists
    const asset = await assetRepository.findById(resource);
    if (!asset) {
      throw new ApiError(404, "Resource not found");
    }
    
    // Check overlapping
    const overlapping = await bookingRepository.findOverlapping(resource, new Date(startTime), new Date(endTime));
    if (overlapping.length > 0) {
      throw new ApiError(400, "The resource is already booked during this time slot.");
    }
    
    // Create booking
    const booking = await bookingRepository.create({
      resource,
      bookedBy: userId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      notes,
      status: "Upcoming"
    });
    
    // Optionally trigger notification/activity log here
    return booking;
  }

  async getBookings(query) {
    return await bookingRepository.findAll(query);
  }

  async cancelBooking(bookingId, userId, userRole) {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }
    
    if (booking.status !== "Upcoming") {
      throw new ApiError(400, "Only upcoming bookings can be cancelled");
    }
    
    if (booking.bookedBy._id.toString() !== userId.toString() && !["Admin", "Asset Manager", "Department Head"].includes(userRole)) {
      throw new ApiError(403, "Not authorized to cancel this booking");
    }
    
    const updatedBooking = await bookingRepository.update(bookingId, { status: "Cancelled" });
    return updatedBooking;
  }
}

module.exports = new BookingService();
