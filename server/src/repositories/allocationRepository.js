const AssetAllocation = require("../models/AssetAllocation");

const applySession = (query, session) => {
  if (session) {
    query.session(session);
  }

  return query;
};

const buildPopulate = (query) => {
  return query
    .populate("asset", "assetTag name serialNumber status condition location isDeleted")
    .populate("allocatedTo", "name email role department isActive")
    .populate("allocatedBy", "name email role")
    .populate("returnedBy", "name email role")
    .populate("history.performedBy", "name email role");
};

const create = async ({ payload, session }) => {
  if (session) {
    const allocations = await AssetAllocation.create([payload], { session });
    return allocations[0];
  }

  return AssetAllocation.create(payload);
};

const findById = ({ allocationId, session, populate = false }) => {
  const query = AssetAllocation.findById(allocationId);

  if (populate) {
    buildPopulate(query);
  }

  return applySession(query, session);
};

const findOne = ({ filter, session, populate = false }) => {
  const query = AssetAllocation.findOne(filter);

  if (populate) {
    buildPopulate(query);
  }

  return applySession(query, session);
};

const findActiveByAsset = ({ assetId, session, populate = false }) => {
  return findOne({
    filter: {
      asset: assetId,
      status: "Active"
    },
    session,
    populate
  });
};

const findMany = ({ filter, sort, skip, limit, populate = false }) => {
  const query = AssetAllocation.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (populate) {
    buildPopulate(query);
  }

  return query;
};

const countDocuments = (filter) => AssetAllocation.countDocuments(filter);

const save = (allocation, session) => {
  if (session) {
    return allocation.save({ session });
  }

  return allocation.save();
};

module.exports = {
  create,
  findById,
  findOne,
  findActiveByAsset,
  findMany,
  countDocuments,
  save
};
