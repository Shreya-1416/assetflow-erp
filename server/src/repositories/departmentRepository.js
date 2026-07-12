const Department = require("../models/Department");

const applySession = (query, session) => {
  if (session) {
    query.session(session);
  }

  return query;
};

const findById = ({ departmentId, session, populateHead = false }) => {
  const query = Department.findById(departmentId);

  if (populateHead) {
    query.populate("head", "name email role department isActive");
  }

  return applySession(query, session);
};

const findOne = ({ filter, session, populateHead = false }) => {
  const query = Department.findOne(filter);

  if (populateHead) {
    query.populate("head", "name email role department isActive");
  }

  return applySession(query, session);
};

const findByHeadId = ({ userId, session, populateHead = false }) => {
  return findOne({
    filter: { head: userId },
    session,
    populateHead
  });
};

const save = (department, session) => {
  if (session) {
    return department.save({ session });
  }

  return department.save();
};

module.exports = {
  findById,
  findOne,
  findByHeadId,
  save
};
