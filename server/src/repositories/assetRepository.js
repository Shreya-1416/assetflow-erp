const Asset = require("../models/Asset");

const applySession = (query, session) => {
  if (session) {
    query.session(session);
  }

  return query;
};

const buildPopulate = (query) => {
  return query
    .populate("category", "name description isActive")
    .populate("department", "name description isActive")
    .populate("history.changedBy", "name email role");
};

const findById = ({ assetId, session, includeDeleted = false, populate = false }) => {
  const query = Asset.findOne({
    _id: assetId,
    ...(includeDeleted ? {} : { isDeleted: false })
  });

  if (populate) {
    buildPopulate(query);
  }

  return applySession(query, session);
};

const findOne = ({ filter, session, populate = false }) => {
  const query = Asset.findOne(filter);

  if (populate) {
    buildPopulate(query);
  }

  return applySession(query, session);
};

const create = async ({ payload, session }) => {
  if (session) {
    const assets = await Asset.create([payload], { session });
    return assets[0];
  }

  return Asset.create(payload);
};

const save = (asset, session) => {
  if (session) {
    return asset.save({ session });
  }

  return asset.save();
};

const findMany = ({ filter, sort, skip, limit, populate = false }) => {
  const query = Asset.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (populate) {
    buildPopulate(query);
  }

  return query;
};

const countDocuments = (filter) => Asset.countDocuments(filter);

module.exports = {
  findById,
  findOne,
  create,
  save,
  findMany,
  countDocuments
};
