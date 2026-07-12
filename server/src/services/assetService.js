const path = require("path");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

const assetRepository = require("../repositories/assetRepository");
const counterRepository = require("../repositories/counterRepository");
const categoryRepository = require("../repositories/categoryRepository");
const departmentRepository = require("../repositories/departmentRepository");
const ApiError = require("../utils/ApiError");
const { ASSET_CONDITIONS, ASSET_HISTORY_ACTION, ASSET_STATUSES } = require("../utils/constants");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const COUNTER_KEY = "assetTag";

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeSerialNumber = (value) => value.trim().toLowerCase();
const generateAssetTag = (sequence) => `AF-${String(sequence).padStart(5, "0")}`;
const isTruthyQuery = (value) => value === true || value === "true";

const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new ApiError(400, "Invalid date value provided");
  }

  return parsedDate;
};

const parsePagination = ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) => {
  const parsedPage = Math.max(Number.parseInt(page, 10) || DEFAULT_PAGE, 1);
  const parsedLimit = Math.min(Math.max(Number.parseInt(limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit
  };
};

const parseSorting = ({ sortBy = "createdAt", sortOrder = "desc" }) => {
  const allowedSortFields = new Set(["createdAt", "updatedAt", "name", "assetTag", "status", "condition", "purchaseDate"]);
  const safeSortBy = allowedSortFields.has(sortBy) ? sortBy : "createdAt";
  const safeSortOrder = String(sortOrder).toLowerCase() === "asc" ? 1 : -1;

  return {
    [safeSortBy]: safeSortOrder,
    _id: -1
  };
};

const mapPhotos = (files = []) => {
  return files.map((file) => ({
    url: path.posix.join("/uploads/assets", file.filename),
    filename: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    uploadedAt: new Date()
  }));
};

const mapHistory = (history = []) => {
  return [...history]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((entry) => ({
      id: entry._id,
      action: entry.action,
      message: entry.message,
      changedBy: entry.changedBy && entry.changedBy._id
        ? {
            id: entry.changedBy._id,
            name: entry.changedBy.name,
            email: entry.changedBy.email,
            role: entry.changedBy.role
          }
        : null,
      changes: entry.changes ? Object.fromEntries(entry.changes) : undefined,
      createdAt: entry.createdAt
    }));
};

const sanitizeAsset = (asset) => ({
  id: asset._id,
  assetTag: asset.assetTag,
  name: asset.name,
  serialNumber: asset.serialNumber,
  description: asset.description,
  manufacturer: asset.manufacturer,
  model: asset.model,
  category: asset.category && asset.category._id
    ? {
        id: asset.category._id,
        name: asset.category.name,
        isActive: asset.category.isActive
      }
    : asset.category,
  department: asset.department && asset.department._id
    ? {
        id: asset.department._id,
        name: asset.department.name,
        isActive: asset.department.isActive
      }
    : asset.department,
  location: asset.location,
  condition: asset.condition,
  status: asset.status,
  lifecycle: asset.status,
  purchaseDate: asset.purchaseDate,
  warrantyExpiry: asset.warrantyExpiry,
  qrCode: asset.qrCode,
  photos: asset.photos,
  history: mapHistory(asset.history),
  isDeleted: asset.isDeleted,
  deletedAt: asset.deletedAt,
  createdAt: asset.createdAt,
  updatedAt: asset.updatedAt
});

const getAssetByIdOrThrow = async (assetId, session, includeDeleted = false) => {
  const asset = await assetRepository.findById({
    assetId,
    session,
    includeDeleted,
    populate: true
  });

  if (!asset) {
    throw new ApiError(404, "Asset not found");
  }

  return asset;
};

const ensureSerialNumberAvailable = async (serialNumber, excludeAssetId, session) => {
  const existingAsset = await assetRepository.findOne({
    filter: {
      normalizedSerialNumber: normalizeSerialNumber(serialNumber),
      ...(excludeAssetId ? { _id: { $ne: excludeAssetId } } : {})
    },
    session
  });

  if (existingAsset) {
    throw new ApiError(409, "Asset serial number already exists");
  }
};

const ensureCategoryIsActive = async (categoryId, session) => {
  const category = await categoryRepository.findById({ categoryId, session });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (!category.isActive) {
    throw new ApiError(400, "Inactive category cannot be assigned to an asset");
  }

  return category;
};

const ensureDepartmentIsActive = async (departmentId, session) => {
  const department = await departmentRepository.findById({ departmentId, session, populateHead: false });

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  if (!department.isActive) {
    throw new ApiError(400, "Inactive department cannot receive new assets");
  }

  return department;
};

const buildHistoryEntry = ({ action, message, changedBy, changes }) => ({
  action,
  message,
  changedBy: changedBy ? changedBy._id : null,
  ...(changes && Object.keys(changes).length > 0 ? { changes } : {}),
  createdAt: new Date()
});

const buildFilters = ({ search, status, condition, categoryId, departmentId, includeDeleted }) => {
  const filters = {
    ...(isTruthyQuery(includeDeleted) ? {} : { isDeleted: false })
  };

  if (status) {
    filters.status = status;
  }

  if (condition) {
    filters.condition = condition;
  }

  if (categoryId) {
    filters.category = categoryId;
  }

  if (departmentId) {
    filters.department = departmentId;
  }

  if (search && search.trim()) {
    const searchRegex = new RegExp(escapeRegExp(search.trim()), "i");
    filters.$or = [
      { name: searchRegex },
      { assetTag: searchRegex },
      { serialNumber: searchRegex },
      { manufacturer: searchRegex },
      { model: searchRegex },
      { location: searchRegex },
      { description: searchRegex }
    ];
  }

  return filters;
};

const buildAssetPayload = async ({ body, files, actor, existingAsset, session }) => {
  const payload = {};
  const changes = {};

  const applyStringField = (field, nextValue) => {
    if (typeof nextValue === "undefined") {
      return;
    }

    const trimmedValue = String(nextValue).trim();
    const currentValue = existingAsset ? existingAsset[field] || "" : undefined;

    if (!existingAsset || currentValue !== trimmedValue) {
      payload[field] = trimmedValue;
      if (existingAsset) {
        changes[field] = { from: currentValue, to: trimmedValue };
      }
    }
  };

  applyStringField("name", body.name);
  applyStringField("description", body.description);
  applyStringField("manufacturer", body.manufacturer);
  applyStringField("model", body.model);
  applyStringField("location", body.location);

  if (typeof body.serialNumber !== "undefined") {
    const nextSerialNumber = String(body.serialNumber).trim();
    const currentSerialNumber = existingAsset ? existingAsset.serialNumber : undefined;

    if (!existingAsset || currentSerialNumber !== nextSerialNumber) {
      await ensureSerialNumberAvailable(nextSerialNumber, existingAsset ? existingAsset._id : null, session);
      payload.serialNumber = nextSerialNumber;
      if (existingAsset) {
        changes.serialNumber = { from: currentSerialNumber, to: nextSerialNumber };
      }
    }
  }

  if (typeof body.categoryId !== "undefined") {
    const category = await ensureCategoryIsActive(body.categoryId, session);
    const currentCategoryId = existingAsset && existingAsset.category ? String(existingAsset.category._id || existingAsset.category) : null;

    if (!existingAsset || currentCategoryId !== String(category._id)) {
      payload.category = category._id;
      if (existingAsset) {
        changes.categoryId = { from: currentCategoryId, to: String(category._id) };
      }
    }
  }

  if (typeof body.departmentId !== "undefined") {
    const department = await ensureDepartmentIsActive(body.departmentId, session);
    const currentDepartmentId = existingAsset && existingAsset.department ? String(existingAsset.department._id || existingAsset.department) : null;

    if (!existingAsset || currentDepartmentId !== String(department._id)) {
      payload.department = department._id;
      if (existingAsset) {
        changes.departmentId = { from: currentDepartmentId, to: String(department._id) };
      }
    }
  }

  if (typeof body.condition !== "undefined") {
    if (!ASSET_CONDITIONS.includes(body.condition)) {
      throw new ApiError(400, "Invalid asset condition provided");
    }

    if (!existingAsset || existingAsset.condition !== body.condition) {
      payload.condition = body.condition;
      if (existingAsset) {
        changes.condition = { from: existingAsset.condition, to: body.condition };
      }
    }
  }

  if (typeof body.status !== "undefined") {
    if (!ASSET_STATUSES.includes(body.status)) {
      throw new ApiError(400, "Invalid asset status provided");
    }

    if (!existingAsset || existingAsset.status !== body.status) {
      payload.status = body.status;
      if (existingAsset) {
        changes.status = { from: existingAsset.status, to: body.status };
      }
    }
  }

  if (typeof body.purchaseDate !== "undefined") {
    const parsedDate = parseDateValue(body.purchaseDate);
    payload.purchaseDate = parsedDate;

    if (existingAsset) {
      changes.purchaseDate = { from: existingAsset.purchaseDate, to: parsedDate };
    }
  }

  if (typeof body.warrantyExpiry !== "undefined") {
    const parsedDate = parseDateValue(body.warrantyExpiry);
    payload.warrantyExpiry = parsedDate;

    if (existingAsset) {
      changes.warrantyExpiry = { from: existingAsset.warrantyExpiry, to: parsedDate };
    }
  }

  const uploadedPhotos = mapPhotos(files);

  if (uploadedPhotos.length > 0) {
    payload.photos = existingAsset ? [...existingAsset.photos, ...uploadedPhotos] : uploadedPhotos;
    if (existingAsset) {
      changes.photosAdded = uploadedPhotos.map((photo) => photo.filename);
    }
  }

  if (!existingAsset) {
    const counter = await counterRepository.incrementSequence({ key: COUNTER_KEY, session });
    const assetTag = generateAssetTag(counter.sequence);
    const qrCodeValue = JSON.stringify({
      assetTag,
      serialNumber: payload.serialNumber,
      name: payload.name
    });

    payload.assetTag = assetTag;
    payload.qrCode = {
      value: qrCodeValue,
      dataUrl: await QRCode.toDataURL(qrCodeValue, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 240
      }),
      generatedAt: new Date()
    };
    payload.history = [
      buildHistoryEntry({
        action: ASSET_HISTORY_ACTION.CREATED,
        message: `Asset ${assetTag} registered`,
        changedBy: actor,
        changes: {
          status: payload.status || "Available",
          condition: payload.condition || "Good"
        }
      })
    ];
  }

  return {
    payload,
    changes
  };
};

const registerAsset = async ({ body, files, actor }) => {
  const session = await mongoose.startSession();

  try {
    let assetId;

    await session.withTransaction(async () => {
      await ensureSerialNumberAvailable(body.serialNumber, null, session);

      const { payload } = await buildAssetPayload({
        body,
        files,
        actor,
        existingAsset: null,
        session
      });

      const asset = await assetRepository.create({
        payload: {
          ...payload,
          status: payload.status || "Available",
          condition: payload.condition || "Good"
        },
        session
      });

      assetId = asset._id;
    });

    const asset = await getAssetByIdOrThrow(assetId, null, true);
    return sanitizeAsset(asset);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Asset tag or serial number already exists");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

const updateAsset = async ({ assetId, body, files, actor }) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const asset = await getAssetByIdOrThrow(assetId, session);
      const { payload, changes } = await buildAssetPayload({
        body,
        files,
        actor,
        existingAsset: asset,
        session
      });

      Object.assign(asset, payload);

      if (Object.keys(changes).length > 0) {
        const historyAction = changes.status ? ASSET_HISTORY_ACTION.STATUS_CHANGED : ASSET_HISTORY_ACTION.UPDATED;
        const historyMessage = changes.status
          ? `Asset status changed from ${changes.status.from} to ${changes.status.to}`
          : `Asset ${asset.assetTag} updated`;

        asset.history.push(
          buildHistoryEntry({
            action: historyAction,
            message: historyMessage,
            changedBy: actor,
            changes
          })
        );
      }

      await assetRepository.save(asset, session);
    });

    const asset = await getAssetByIdOrThrow(assetId);
    return sanitizeAsset(asset);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Asset tag or serial number already exists");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

const softDeleteAsset = async ({ assetId, actor }) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const asset = await getAssetByIdOrThrow(assetId, session);

      if (asset.isDeleted) {
        return;
      }

      asset.isDeleted = true;
      asset.deletedAt = new Date();
      asset.history.push(
        buildHistoryEntry({
          action: ASSET_HISTORY_ACTION.SOFT_DELETED,
          message: `Asset ${asset.assetTag} soft deleted`,
          changedBy: actor,
          changes: {
            isDeleted: { from: false, to: true }
          }
        })
      );

      await assetRepository.save(asset, session);
    });

    const asset = await assetRepository.findById({ assetId, includeDeleted: true, populate: true });
    return sanitizeAsset(asset);
  } finally {
    await session.endSession();
  }
};

const getAssetById = async (assetId, includeDeleted = false) => {
  const asset = await getAssetByIdOrThrow(assetId, null, isTruthyQuery(includeDeleted));
  return sanitizeAsset(asset);
};

const getAssetHistory = async (assetId, includeDeleted = false) => {
  const asset = await getAssetByIdOrThrow(assetId, null, isTruthyQuery(includeDeleted));

  return {
    assetId: asset._id,
    assetTag: asset.assetTag,
    history: mapHistory(asset.history)
  };
};

const listAssets = async (query) => {
  const { page, limit, skip } = parsePagination(query);
  const sort = parseSorting(query);
  const filters = buildFilters(query);

  const [assets, totalItems] = await Promise.all([
    assetRepository.findMany({
      filter: filters,
      sort,
      skip,
      limit,
      populate: true
    }),
    assetRepository.countDocuments(filters)
  ]);

  return {
    items: assets.map(sanitizeAsset),
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit) || 1
    },
    sorting: {
      sortBy: Object.keys(sort)[0],
      sortOrder: sort[Object.keys(sort)[0]] === 1 ? "asc" : "desc"
    }
  };
};

module.exports = {
  registerAsset,
  updateAsset,
  softDeleteAsset,
  getAssetById,
  getAssetHistory,
  listAssets
};
