const Category = require("../models/Category");

const applySession = (query, session) => {
  if (session) {
    query.session(session);
  }

  return query;
};

const findById = ({ categoryId, session }) => {
  return applySession(Category.findById(categoryId), session);
};

module.exports = {
  findById
};
