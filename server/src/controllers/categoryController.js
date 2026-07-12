const categoryService = require("../services/categoryService");
const asyncHandler = require("../utils/asyncHandler");

const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: {
      category
    }
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: {
      category
    }
  });
});

const deactivateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.deactivateCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deactivated successfully",
    data: {
      category
    }
  });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      category
    }
  });
});

const listCategories = asyncHandler(async (req, res) => {
  const result = await categoryService.listCategories(req.query);

  res.status(200).json({
    success: true,
    data: result
  });
});

module.exports = {
  createCategory,
  updateCategory,
  deactivateCategory,
  getCategoryById,
  listCategories
};
