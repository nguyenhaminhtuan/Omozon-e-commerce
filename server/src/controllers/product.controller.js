const fs = require('fs');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const catchAsync = require('../utils/catchAsync');

function removeImg(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find().sort({ createAt: -1 });

  return res.status(200).json({ message: 'Fetched all product', products });
});

exports.getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'Product not found!' });

  return res
    .status(200)
    .json({ message: 'Get product success', data: { product } });
});

exports.createProduct = catchAsync(async (req, res) => {
  const isExisted = await Product.findOne({ name: req.body.name });

  if (isExisted)
    return res.status(400).json({ message: 'Product name already exist' });

  const category = await Category.findById(req.body.category);

  if (!category)
    return res.status(400).json({ message: "Category doesn't exist!" });

  if (req.file) req.body.image = req.file.filename;

  const product = new Product(req.body);
  await product.save();
  category.products.push(product.id);
  await category.save();

  return res
    .status(201)
    .json({ message: 'Product created', data: { product } });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'Product not found!' });

  const existed = await Product.findOne({ name: req.body.name }).select('name');

  if (existed.id !== product.id && existed.name === req.body.name)
    return res.status(400).json({ message: 'Product already exist' });

  const category = await Category.findById(req.body.category);

  if (!category)
    return res.status(400).json({ message: "Category doesn't exist!" });

  if (req.body.category !== product.category) {
    category.products.push(product._id);
    await category.save();
  }

  if (req.file) req.body.image = req.file.filename;

  const productUpdate = await Product.findByIdAndUpdate(product.id, req.body, {
    new: true
  });

  return res
    .status(200)
    .json({ message: 'Product updated', data: { product: productUpdate } });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(400).json({ message: 'Product not found!' });

  await Category.updateOne(
    { _id: product.category },
    { $pull: { products: product._id } }
  );

  await removeImg(`public/img/products/${product.image}`);

  return res.status(204).json({ message: 'Product removed', data: null });
});
