const Category = require("../models/Category");
const ApiError = require("../utils/ApiError");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const normalizeName = (value) => value.trim().toLowerCase();

const parsePagination = ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) => {
  const parsedPage = Math.max(Number.parseInt(page, 10) || DEFAULT_PAGE, 1);
  const parsedLimit = Math.min(Math.max(Number.parseInt(limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit
  };
};

const mapMetadata = (metadata) => {
  if (!metadata) {
    return undefined;
  }

  if (metadata instanceof Map) {
    return Object.fromEntries(metadata);
  }

  return metadata;
};

const sanitizeCategory = (category) => ({
  id: category._id,
  name: category.name,
  description: category.description,
  metadata: mapMetadata(category.metadata),
  isActive: category.isActive,
  deactivatedAt: category.deactivatedAt,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt
});

const ensureCategoryNameAvailable = async (name, excludeCategoryId) => {
  const existingCategory = await Category.findOne({
    normalizedName: normalizeName(name),
    ...(excludeCategoryId ? { _id: { $ne: excludeCategoryId } } : {})
  });

  if (existingCategory) {
    throw new ApiError(409, "Category name already exists");
  }
};

const getCategoryDocumentOrThrow = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

const createCategory = async ({ name, description, metadata }) => {
  try {
    await ensureCategoryNameAvailable(name);

    const category = await Category.create({
      name,
      description,
      metadata
    });

    return sanitizeCategory(category);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Category name already exists");
    }

    throw error;
  }
};

const updateCategory = async (categoryId, { name, description, metadata, isActive }) => {
  const category = await getCategoryDocumentOrThrow(categoryId);

  if (typeof name !== "undefined" && name.trim() && name.trim() !== category.name) {
    await ensureCategoryNameAvailable(name, categoryId);
    category.name = name.trim();
  }

  if (typeof description !== "undefined") {
    category.description = description;
  }

  if (typeof metadata !== "undefined") {
    category.metadata = metadata;
  }

  if (typeof isActive === "boolean") {
    category.isActive = isActive;
    category.deactivatedAt = isActive ? null : new Date();
  }

  try {
    await category.save();
    return sanitizeCategory(category);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Category name already exists");
    }

    throw error;
  }
};

const deactivateCategory = async (categoryId) => {
  const category = await getCategoryDocumentOrThrow(categoryId);

  if (!category.isActive) {
    return sanitizeCategory(category);
  }

  category.isActive = false;
  category.deactivatedAt = new Date();

  await category.save();

  return sanitizeCategory(category);
};

const getCategoryById = async (categoryId) => {
  const category = await getCategoryDocumentOrThrow(categoryId);
  return sanitizeCategory(category);
};

const listCategories = async ({ page, limit, search, isActive }) => {
  const pagination = parsePagination({ page, limit });
  const filters = {};

  if (typeof isActive !== "undefined") {
    filters.isActive = isActive === true || isActive === "true";
  }

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filters.$or = [
      { name: searchRegex },
      { description: searchRegex }
    ];
  }

  const [categories, totalItems] = await Promise.all([
    Category.find(filters)
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit),
    Category.countDocuments(filters)
  ]);

  return {
    items: categories.map(sanitizeCategory),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      totalItems,
      totalPages: Math.ceil(totalItems / pagination.limit) || 1
    }
  };
};

module.exports = {
  createCategory,
  updateCategory,
  deactivateCategory,
  getCategoryById,
  listCategories
};
