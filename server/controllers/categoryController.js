// controllers/categoryController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Category = require('../models/Category');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Category.find({ isActive: true }), req.query)
    .filter()
    .sort()
    .paginate();

  const categories = await features.query;
  const total = await Category.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    results: categories.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: categories,
  });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.getCategoryCompetitions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const Competition = require('../models/Competition');

  const category = await Category.findById(id);
  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  const features = new APIFeatures(
    Competition.find({ category: id, status: 'published' }),
    req.query
  )
    .filter()
    .search(['title', 'description'])
    .sort()
    .paginate();

  const competitions = await features.query;
  const total = await Competition.countDocuments({ category: id, status: 'published' });

  res.status(200).json({
    success: true,
    results: competitions.length,
    total,
    page: features.page,
    pageSize: features.limit,
    data: competitions,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, description, icon, color } = req.body;

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return next(new AppError('Category already exists', 400));
  }

  const category = await Category.create({
    name: name.trim(),
    description,
    icon: icon || '📁',
    color: color || '#3B82F6',
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const { name, description, icon, color, isActive } = req.body;

  const updateData = {};
  if (name) updateData.name = name.trim();
  if (description) updateData.description = description;
  if (icon) updateData.icon = icon;
  if (color) updateData.color = color;
  if (isActive !== undefined) updateData.isActive = isActive;

  const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});

module.exports = exports;
