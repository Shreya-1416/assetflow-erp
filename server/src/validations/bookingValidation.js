const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const { BOOKING_STATUSES } = require("../utils/constants");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateBookingId = (params) => {
  if (!isValidObjectId(params.id)) {
    throw new ApiError(400, "Invalid booking id");
  }
};

const validateCreateBooking = (body) => {
  const { resource, startTime, endTime } = body;
  
  if (!resource || !isValidObjectId(resource)) {
    throw new ApiError(400, "Valid resource id is required");
  }
  
  if (!startTime || !endTime) {
    throw new ApiError(400, "startTime and endTime are required");
  }
  
  if (Number.isNaN(new Date(startTime).getTime())) {
    throw new ApiError(400, "startTime must be a valid date");
  }
  
  if (Number.isNaN(new Date(endTime).getTime())) {
    throw new ApiError(400, "endTime must be a valid date");
  }
  
  if (new Date(startTime) >= new Date(endTime)) {
    throw new ApiError(400, "endTime must be after startTime");
  }
};

const validateBooking = (type) => {
  return (req, res, next) => {
    try {
      if (type === "create") {
        validateCreateBooking(req.body);
      }
      if (type === "id" || type === "cancel") {
        validateBookingId(req.params);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateBooking;
