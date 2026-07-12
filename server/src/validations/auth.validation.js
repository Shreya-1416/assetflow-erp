const ApiError = require("../utils/ApiError");
const { USER_ROLES } = require("../utils/constants");

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateRegister = (body) => {
  const { name, email, password, role } = body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Name is required");
  }

  if (!email || !isEmail(email)) {
    throw new ApiError(400, "A valid email is required");
  }

  if (!password || password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  if (role && !USER_ROLES.includes(role)) {
    throw new ApiError(400, "Invalid role provided");
  }
};

const validateLogin = (body) => {
  const { email, password } = body;

  if (!email || !isEmail(email)) {
    throw new ApiError(400, "A valid email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }
};

const validateAuth = (type) => {
  return (req, res, next) => {
    try {
      if (type === "register") {
        validateRegister(req.body);
      }

      if (type === "login") {
        validateLogin(req.body);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateAuth;
