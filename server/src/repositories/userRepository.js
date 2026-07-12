const User = require("../models/User");

const applySession = (query, session) => {
  if (session) {
    query.session(session);
  }

  return query;
};

const findById = ({ userId, session, includePassword = false }) => {
  const query = User.findById(userId);

  if (includePassword) {
    query.select("+password");
  } else {
    query.select("-password");
  }

  return applySession(query, session);
};

const findOne = ({ filter, session, includePassword = false }) => {
  const query = User.findOne(filter);

  if (includePassword) {
    query.select("+password");
  } else {
    query.select("-password");
  }

  return applySession(query, session);
};

const create = async ({ payload, session }) => {
  if (session) {
    const users = await User.create([payload], { session });
    return users[0];
  }

  return User.create(payload);
};

const save = (user, session) => {
  if (session) {
    return user.save({ session });
  }

  return user.save();
};

const updateOne = ({ filter, update, session }) => {
  return User.updateOne(filter, update, session ? { session } : {});
};

const updateMany = ({ filter, update, session }) => {
  return User.updateMany(filter, update, session ? { session } : {});
};

const findDirectory = ({ filter, skip, limit, sort }) => {
  return User.find(filter)
    .select("-password")
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

const countDocuments = (filter) => User.countDocuments(filter);

module.exports = {
  findById,
  findOne,
  create,
  save,
  updateOne,
  updateMany,
  findDirectory,
  countDocuments
};
