const Category = require('../models/category.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find().sort({ createAt: -1 });

  return res
    .status(200)
    .json({ message: 'Fetched categories', data: { categories } });
});

exports.getCategory = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).json({ message: 'Category not found!' });

  return res
    .status(200)
    .json({ message: 'Get category success', data: { category } });
});

exports.createCategory = catchAsync(async (req, res) => {
  const isExisted = await Category.findOne(req.body);

  if (isExisted)
    return res.status(400).json({ message: 'Category name already exist' });

  const category = new Category(req.body);
  await category.save();

  return res
    .status(201)
    .json({ message: 'Category created', data: { category } });
});

exports.updateCategory = catchAsync(async (req, res) => {
  const isExisted = await Category.findOne(req.body);

  if (isExisted)
    return res.status(400).json({ message: 'Category name already exist' });

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!category)
    return res.status(404).json({ message: 'Category not found!' });

  return res
    .status(200)
    .json({ message: 'Category updated', data: { category } });
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return res.status(404).json({ message: 'Category not found!' });

  return res.status(204).json({ message: 'Category removed', data: null });
});
