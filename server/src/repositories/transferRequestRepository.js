const AssetTransferRequest = require("../models/AssetTransferRequest");

const applySession = (query, session) => {
  if (session) {
    query.session(session);
  }

  return query;
};

const buildPopulate = (query) => {
  return query
    .populate("allocation")
    .populate("asset", "assetTag name serialNumber status condition location isDeleted")
    .populate("fromUser", "name email role department isActive")
    .populate("toUser", "name email role department isActive")
    .populate("requestedBy", "name email role")
    .populate("approvedBy", "name email role")
    .populate("rejectedBy", "name email role");
};

const create = async ({ payload, session }) => {
  if (session) {
    const requests = await AssetTransferRequest.create([payload], { session });
    return requests[0];
  }

  return AssetTransferRequest.create(payload);
};

const findById = ({ requestId, session, populate = false }) => {
  const query = AssetTransferRequest.findById(requestId);

  if (populate) {
    buildPopulate(query);
  }

  return applySession(query, session);
};

const findOne = ({ filter, session, populate = false }) => {
  const query = AssetTransferRequest.findOne(filter);

  if (populate) {
    buildPopulate(query);
  }

  return applySession(query, session);
};

const findPendingByAsset = ({ assetId, session, populate = false }) => {
  return findOne({
    filter: {
      asset: assetId,
      status: "Pending"
    },
    session,
    populate
  });
};

const findMany = ({ filter, sort, skip, limit, populate = false }) => {
  const query = AssetTransferRequest.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (populate) {
    buildPopulate(query);
  }

  return query;
};

const countDocuments = (filter) => AssetTransferRequest.countDocuments(filter);

const save = (request, session) => {
  if (session) {
    return request.save({ session });
  }

  return request.save();
};

module.exports = {
  create,
  findById,
  findOne,
  findPendingByAsset,
  findMany,
  countDocuments,
  save
};
