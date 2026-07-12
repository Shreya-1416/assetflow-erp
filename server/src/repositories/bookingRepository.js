const ResourceBooking = require("../models/ResourceBooking");

class BookingRepository {
  async create(bookingData) {
    const booking = new ResourceBooking(bookingData);
    return await booking.save();
  }

  async findById(id) {
    return await ResourceBooking.findById(id).populate("resource bookedBy");
  }

  async findOverlapping(resourceId, startTime, endTime) {
    return await ResourceBooking.find({
      resource: resourceId,
      status: { $in: ["Upcoming", "Ongoing"] },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });
  }

  async update(id, updateData) {
    return await ResourceBooking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate("resource bookedBy");
  }

  async findAll(query = {}) {
    return await ResourceBooking.find(query).populate("resource bookedBy").sort({ startTime: 1 });
  }
}

module.exports = new BookingRepository();
