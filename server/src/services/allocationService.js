const mongoose = require("mongoose");

const allocationRepository = require("../repositories/allocationRepository");
const transferRequestRepository = require("../repositories/transferRequestRepository");
const assetRepository = require("../repositories/assetRepository");
const userRepository = require("../repositories/userRepository");
const notificationRepository = require("../repositories/notificationRepository");
const activityLogRepository = require("../repositories/activityLogRepository");
const ApiError = require("../utils/ApiError");
const { ASSET_HISTORY_ACTION } = require("../utils/constants");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const parsePagination = ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) => {
  const parsedPage = Math.max(Number.parseInt(page, 10) || DEFAULT_PAGE, 1);
  const parsedLimit = Math.min(Math.max(Number.parseInt(limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit
  };
};

const parseDate = (value, fieldName) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, `${fieldName} must be a valid date`);
  }

  return date;
};

const ensureFutureDate = (date, fieldName) => {
  if (date <= new Date()) {
    throw new ApiError(400, `${fieldName} must be in the future`);
  }
};

const getAssetOrThrow = async (assetId, session) => {
  const asset = await assetRepository.findById({
    assetId,
    session,
    includeDeleted: false,
    populate: false
  });

  if (!asset) {
    throw new ApiError(404, "Asset not found");
  }

  return asset;
};

const getActiveUserOrThrow = async (userId, session, label = "Employee") => {
  const user = await userRepository.findById({ userId, session });

  if (!user) {
    throw new ApiError(404, `${label} not found`);
  }

  if (!user.isActive) {
    throw new ApiError(400, `${label} is inactive`);
  }

  return user;
};

const getAllocationOrThrow = async (allocationId, session) => {
  const allocation = await allocationRepository.findById({
    allocationId,
    session,
    populate: false
  });

  if (!allocation) {
    throw new ApiError(404, "Allocation not found");
  }

  return allocation;
};

const getTransferRequestOrThrow = async (requestId, session) => {
  const request = await transferRequestRepository.findById({
    requestId,
    session,
    populate: false
  });

  if (!request) {
    throw new ApiError(404, "Transfer request not found");
  }

  return request;
};

const buildAssetHistoryEntry = ({ action, message, actor, changes }) => ({
  action,
  message,
  changedBy: actor ? actor._id : null,
  ...(changes ? { changes } : {}),
  createdAt: new Date()
});

const buildAllocationHistoryEntry = ({ action, message, actor, metadata }) => ({
  action,
  message,
  performedBy: actor ? actor._id : null,
  ...(metadata ? { metadata } : {}),
  createdAt: new Date()
});

const createNotification = ({ type, title, message, recipients, actor, payload, session }) => {
  const uniqueRecipients = [...new Set(recipients.filter(Boolean).map((recipient) => String(recipient)))];

  return notificationRepository.create({
    payload: {
      type,
      title,
      message,
      recipients: uniqueRecipients,
      actor: actor ? actor._id : null,
      payload
    },
    session
  });
};

const createActivityLog = ({ action, actor, entityType, entityId, message, metadata, session }) => {
  return activityLogRepository.create({
    payload: {
      action,
      actor: actor ? actor._id : null,
      entityType,
      entityId,
      message,
      metadata
    },
    session
  });
};

const sanitizeUser = (user) => {
  if (!user || !user._id) {
    return null;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    isActive: user.isActive
  };
};

const sanitizeAsset = (asset) => {
  if (!asset || !asset._id) {
    return null;
  }

  return {
    id: asset._id,
    assetTag: asset.assetTag,
    name: asset.name,
    serialNumber: asset.serialNumber,
    status: asset.status,
    condition: asset.condition,
    location: asset.location,
    isDeleted: asset.isDeleted
  };
};

const sanitizeAllocation = (allocation) => ({
  id: allocation._id,
  asset: sanitizeAsset(allocation.asset),
  allocatedTo: sanitizeUser(allocation.allocatedTo),
  allocatedBy: sanitizeUser(allocation.allocatedBy),
  expectedReturnDate: allocation.expectedReturnDate,
  allocatedAt: allocation.allocatedAt,
  returnedAt: allocation.returnedAt,
  returnedBy: sanitizeUser(allocation.returnedBy),
  status: allocation.status,
  notes: allocation.notes,
  returnNotes: allocation.returnNotes,
  history: [...allocation.history]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((entry) => ({
      id: entry._id,
      action: entry.action,
      message: entry.message,
      performedBy: sanitizeUser(entry.performedBy),
      metadata: entry.metadata ? Object.fromEntries(entry.metadata) : undefined,
      createdAt: entry.createdAt
    })),
  createdAt: allocation.createdAt,
  updatedAt: allocation.updatedAt
});

const sanitizeTransferRequest = (request) => ({
  id: request._id,
  allocation: request.allocation && request.allocation._id ? request.allocation._id : request.allocation,
  asset: sanitizeAsset(request.asset),
  fromUser: sanitizeUser(request.fromUser),
  toUser: sanitizeUser(request.toUser),
  requestedBy: sanitizeUser(request.requestedBy),
  approvedBy: sanitizeUser(request.approvedBy),
  rejectedBy: sanitizeUser(request.rejectedBy),
  status: request.status,
  reason: request.reason,
  decisionNote: request.decisionNote,
  expectedReturnDate: request.expectedReturnDate,
  decidedAt: request.decidedAt,
  createdAt: request.createdAt,
  updatedAt: request.updatedAt
});

const getPopulatedAllocation = async (allocationId) => {
  const allocation = await allocationRepository.findById({
    allocationId,
    populate: true
  });

  if (!allocation) {
    throw new ApiError(404, "Allocation not found");
  }

  return allocation;
};

const getPopulatedTransferRequest = async (requestId) => {
  const request = await transferRequestRepository.findById({
    requestId,
    populate: true
  });

  if (!request) {
    throw new ApiError(404, "Transfer request not found");
  }

  return request;
};

const allocateAsset = async ({ assetId, allocatedTo, expectedReturnDate, notes, actor }) => {
  const session = await mongoose.startSession();

  try {
    let allocationId;

    await session.withTransaction(async () => {
      const asset = await getAssetOrThrow(assetId, session);
      const assignee = await getActiveUserOrThrow(allocatedTo, session, "Assignee");
      const returnDate = parseDate(expectedReturnDate, "expectedReturnDate");

      ensureFutureDate(returnDate, "expectedReturnDate");

      if (asset.status !== "Available") {
        throw new ApiError(409, `Asset is currently ${asset.status} and cannot be allocated`);
      }

      const existingAllocation = await allocationRepository.findActiveByAsset({ assetId, session });

      if (existingAllocation) {
        throw new ApiError(409, "Asset is already allocated");
      }

      const allocation = await allocationRepository.create({
        payload: {
          asset: asset._id,
          allocatedTo: assignee._id,
          allocatedBy: actor._id,
          expectedReturnDate: returnDate,
          notes,
          history: [
            buildAllocationHistoryEntry({
              action: "Allocated",
              message: `Asset ${asset.assetTag} allocated to ${assignee.name}`,
              actor,
              metadata: {
                asset: String(asset._id),
                allocatedTo: String(assignee._id),
                expectedReturnDate: returnDate
              }
            })
          ]
        },
        session
      });

      asset.status = "Allocated";
      asset.history.push(
        buildAssetHistoryEntry({
          action: ASSET_HISTORY_ACTION.ALLOCATED,
          message: `Asset allocated to ${assignee.name}`,
          actor,
          changes: {
            status: { from: "Available", to: "Allocated" },
            allocatedTo: String(assignee._id),
            allocation: String(allocation._id)
          }
        })
      );
      await assetRepository.save(asset, session);

      await createNotification({
        type: "Asset Allocated",
        title: "Asset allocated",
        message: `${asset.assetTag} has been allocated to ${assignee.name}`,
        recipients: [assignee._id, actor._id],
        actor,
        payload: {
          assetId: String(asset._id),
          allocationId: String(allocation._id)
        },
        session
      });

      await createActivityLog({
        action: "Asset Allocation Created",
        actor,
        entityType: "AssetAllocation",
        entityId: allocation._id,
        message: `Allocated ${asset.assetTag} to ${assignee.name}`,
        metadata: {
          assetId: String(asset._id),
          allocatedTo: String(assignee._id)
        },
        session
      });

      allocationId = allocation._id;
    });

    return sanitizeAllocation(await getPopulatedAllocation(allocationId));
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Asset is already allocated");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

const returnAsset = async ({ allocationId, condition, location, notes, actor }) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const allocation = await getAllocationOrThrow(allocationId, session);

      if (allocation.status !== "Active") {
        throw new ApiError(409, "Only active allocations can be returned");
      }

      const asset = await getAssetOrThrow(allocation.asset, session);
      const previousStatus = asset.status;

      allocation.status = "Returned";
      allocation.returnedAt = new Date();
      allocation.returnedBy = actor._id;
      allocation.returnNotes = notes || "";
      allocation.history.push(
        buildAllocationHistoryEntry({
          action: "Returned",
          message: `Asset ${asset.assetTag} returned`,
          actor,
          metadata: {
            asset: String(asset._id),
            returnedAt: allocation.returnedAt
          }
        })
      );

      asset.status = "Available";

      if (condition) {
        asset.condition = condition;
      }

      if (location) {
        asset.location = location;
      }

      asset.history.push(
        buildAssetHistoryEntry({
          action: ASSET_HISTORY_ACTION.RETURNED,
          message: "Asset returned and marked available",
          actor,
          changes: {
            status: { from: previousStatus, to: "Available" },
            ...(condition ? { condition } : {}),
            ...(location ? { location } : {})
          }
        })
      );

      await allocationRepository.save(allocation, session);
      await assetRepository.save(asset, session);

      await createNotification({
        type: "Asset Returned",
        title: "Asset returned",
        message: `${asset.assetTag} has been returned`,
        recipients: [allocation.allocatedTo, actor._id],
        actor,
        payload: {
          assetId: String(asset._id),
          allocationId: String(allocation._id)
        },
        session
      });

      await createActivityLog({
        action: "Asset Allocation Returned",
        actor,
        entityType: "AssetAllocation",
        entityId: allocation._id,
        message: `Returned ${asset.assetTag}`,
        metadata: {
          assetId: String(asset._id)
        },
        session
      });
    });

    return sanitizeAllocation(await getPopulatedAllocation(allocationId));
  } finally {
    await session.endSession();
  }
};

const requestTransfer = async ({ allocationId, toUser, reason, expectedReturnDate, actor }) => {
  const session = await mongoose.startSession();

  try {
    let requestId;

    await session.withTransaction(async () => {
      const allocation = await getAllocationOrThrow(allocationId, session);

      if (allocation.status !== "Active") {
        throw new ApiError(409, "Only active allocations can be transferred");
      }

      if (String(allocation.allocatedTo) === String(toUser)) {
        throw new ApiError(409, "Asset is already allocated to this employee");
      }

      const asset = await getAssetOrThrow(allocation.asset, session);
      const targetUser = await getActiveUserOrThrow(toUser, session, "Target employee");
      const pendingRequest = await transferRequestRepository.findPendingByAsset({ assetId: asset._id, session });

      if (pendingRequest) {
        throw new ApiError(409, "A pending transfer request already exists for this asset");
      }

      let nextExpectedReturnDate = allocation.expectedReturnDate;

      if (expectedReturnDate) {
        nextExpectedReturnDate = parseDate(expectedReturnDate, "expectedReturnDate");
        ensureFutureDate(nextExpectedReturnDate, "expectedReturnDate");
      }

      const request = await transferRequestRepository.create({
        payload: {
          allocation: allocation._id,
          asset: asset._id,
          fromUser: allocation.allocatedTo,
          toUser: targetUser._id,
          requestedBy: actor._id,
          reason,
          expectedReturnDate: nextExpectedReturnDate
        },
        session
      });

      allocation.history.push(
        buildAllocationHistoryEntry({
          action: "Transfer Requested",
          message: `Transfer requested for ${asset.assetTag}`,
          actor,
          metadata: {
            transferRequestId: String(request._id),
            fromUser: String(allocation.allocatedTo),
            toUser: String(targetUser._id)
          }
        })
      );

      asset.history.push(
        buildAssetHistoryEntry({
          action: ASSET_HISTORY_ACTION.TRANSFER_REQUESTED,
          message: `Transfer requested to ${targetUser.name}`,
          actor,
          changes: {
            transferRequestId: String(request._id),
            toUser: String(targetUser._id)
          }
        })
      );

      await allocationRepository.save(allocation, session);
      await assetRepository.save(asset, session);

      await createNotification({
        type: "Transfer Requested",
        title: "Asset transfer requested",
        message: `Transfer requested for ${asset.assetTag} to ${targetUser.name}`,
        recipients: [allocation.allocatedTo, targetUser._id, actor._id],
        actor,
        payload: {
          assetId: String(asset._id),
          allocationId: String(allocation._id),
          transferRequestId: String(request._id)
        },
        session
      });

      await createActivityLog({
        action: "Asset Transfer Requested",
        actor,
        entityType: "AssetTransferRequest",
        entityId: request._id,
        message: `Transfer requested for ${asset.assetTag}`,
        metadata: {
          assetId: String(asset._id),
          allocationId: String(allocation._id),
          toUser: String(targetUser._id)
        },
        session
      });

      requestId = request._id;
    });

    return sanitizeTransferRequest(await getPopulatedTransferRequest(requestId));
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "A pending transfer request already exists for this asset");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

const approveTransfer = async ({ requestId, decisionNote, actor }) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const request = await getTransferRequestOrThrow(requestId, session);

      if (request.status !== "Pending") {
        throw new ApiError(409, "Only pending transfer requests can be approved");
      }

      const allocation = await getAllocationOrThrow(request.allocation, session);

      if (allocation.status !== "Active") {
        throw new ApiError(409, "Allocation is no longer active");
      }

      const asset = await getAssetOrThrow(request.asset, session);
      const targetUser = await getActiveUserOrThrow(request.toUser, session, "Target employee");
      const previousAllocatedTo = allocation.allocatedTo;

      allocation.allocatedTo = targetUser._id;
      allocation.expectedReturnDate = request.expectedReturnDate || allocation.expectedReturnDate;
      allocation.history.push(
        buildAllocationHistoryEntry({
          action: "Transfer Approved",
          message: `Asset ${asset.assetTag} transferred to ${targetUser.name}`,
          actor,
          metadata: {
            transferRequestId: String(request._id),
            fromUser: String(previousAllocatedTo),
            toUser: String(targetUser._id)
          }
        })
      );

      request.status = "Approved";
      request.approvedBy = actor._id;
      request.decisionNote = decisionNote || "";
      request.decidedAt = new Date();

      asset.status = "Allocated";
      asset.history.push(
        buildAssetHistoryEntry({
          action: ASSET_HISTORY_ACTION.TRANSFER_APPROVED,
          message: `Transfer approved to ${targetUser.name}`,
          actor,
          changes: {
            transferRequestId: String(request._id),
            fromUser: String(previousAllocatedTo),
            toUser: String(targetUser._id)
          }
        })
      );

      await allocationRepository.save(allocation, session);
      await transferRequestRepository.save(request, session);
      await assetRepository.save(asset, session);

      await createNotification({
        type: "Transfer Approved",
        title: "Asset transfer approved",
        message: `Transfer approved for ${asset.assetTag}`,
        recipients: [previousAllocatedTo, targetUser._id, request.requestedBy, actor._id],
        actor,
        payload: {
          assetId: String(asset._id),
          allocationId: String(allocation._id),
          transferRequestId: String(request._id)
        },
        session
      });

      await createActivityLog({
        action: "Asset Transfer Approved",
        actor,
        entityType: "AssetTransferRequest",
        entityId: request._id,
        message: `Transfer approved for ${asset.assetTag}`,
        metadata: {
          assetId: String(asset._id),
          allocationId: String(allocation._id),
          fromUser: String(previousAllocatedTo),
          toUser: String(targetUser._id)
        },
        session
      });
    });

    return sanitizeTransferRequest(await getPopulatedTransferRequest(requestId));
  } finally {
    await session.endSession();
  }
};

const rejectTransfer = async ({ requestId, decisionNote, actor }) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const request = await getTransferRequestOrThrow(requestId, session);

      if (request.status !== "Pending") {
        throw new ApiError(409, "Only pending transfer requests can be rejected");
      }

      const allocation = await getAllocationOrThrow(request.allocation, session);
      const asset = await getAssetOrThrow(request.asset, session);

      request.status = "Rejected";
      request.rejectedBy = actor._id;
      request.decisionNote = decisionNote || "";
      request.decidedAt = new Date();

      allocation.history.push(
        buildAllocationHistoryEntry({
          action: "Transfer Rejected",
          message: `Transfer rejected for ${asset.assetTag}`,
          actor,
          metadata: {
            transferRequestId: String(request._id),
            decisionNote: request.decisionNote
          }
        })
      );

      asset.history.push(
        buildAssetHistoryEntry({
          action: ASSET_HISTORY_ACTION.TRANSFER_REJECTED,
          message: "Transfer request rejected",
          actor,
          changes: {
            transferRequestId: String(request._id),
            decisionNote: request.decisionNote
          }
        })
      );

      await transferRequestRepository.save(request, session);
      await allocationRepository.save(allocation, session);
      await assetRepository.save(asset, session);

      await createNotification({
        type: "Transfer Rejected",
        title: "Asset transfer rejected",
        message: `Transfer rejected for ${asset.assetTag}`,
        recipients: [request.fromUser, request.toUser, request.requestedBy, actor._id],
        actor,
        payload: {
          assetId: String(asset._id),
          allocationId: String(allocation._id),
          transferRequestId: String(request._id)
        },
        session
      });

      await createActivityLog({
        action: "Asset Transfer Rejected",
        actor,
        entityType: "AssetTransferRequest",
        entityId: request._id,
        message: `Transfer rejected for ${asset.assetTag}`,
        metadata: {
          assetId: String(asset._id),
          allocationId: String(allocation._id)
        },
        session
      });
    });

    return sanitizeTransferRequest(await getPopulatedTransferRequest(requestId));
  } finally {
    await session.endSession();
  }
};

const getAllocationById = async (allocationId) => {
  return sanitizeAllocation(await getPopulatedAllocation(allocationId));
};

const getTransferRequestById = async (requestId) => {
  return sanitizeTransferRequest(await getPopulatedTransferRequest(requestId));
};

const listAllocations = async ({ page, limit, status, assetId, allocatedTo }) => {
  const pagination = parsePagination({ page, limit });
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (assetId) {
    filter.asset = assetId;
  }

  if (allocatedTo) {
    filter.allocatedTo = allocatedTo;
  }

  const [allocations, totalItems] = await Promise.all([
    allocationRepository.findMany({
      filter,
      sort: { createdAt: -1 },
      skip: pagination.skip,
      limit: pagination.limit,
      populate: true
    }),
    allocationRepository.countDocuments(filter)
  ]);

  return {
    items: allocations.map(sanitizeAllocation),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      totalItems,
      totalPages: Math.ceil(totalItems / pagination.limit) || 1
    }
  };
};

const listTransferRequests = async ({ page, limit, status, assetId, fromUser, toUser }) => {
  const pagination = parsePagination({ page, limit });
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (assetId) {
    filter.asset = assetId;
  }

  if (fromUser) {
    filter.fromUser = fromUser;
  }

  if (toUser) {
    filter.toUser = toUser;
  }

  const [requests, totalItems] = await Promise.all([
    transferRequestRepository.findMany({
      filter,
      sort: { createdAt: -1 },
      skip: pagination.skip,
      limit: pagination.limit,
      populate: true
    }),
    transferRequestRepository.countDocuments(filter)
  ]);

  return {
    items: requests.map(sanitizeTransferRequest),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      totalItems,
      totalPages: Math.ceil(totalItems / pagination.limit) || 1
    }
  };
};

module.exports = {
  allocateAsset,
  returnAsset,
  requestTransfer,
  approveTransfer,
  rejectTransfer,
  getAllocationById,
  getTransferRequestById,
  listAllocations,
  listTransferRequests
};
