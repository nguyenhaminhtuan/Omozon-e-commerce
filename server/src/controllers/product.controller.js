const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');

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
    return res.status(400).json({ message: 'Product already exist' });

  const product = new Product(req.body);
  await product.save();

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

  const productUpdate = await Product.findByIdAndUpdate(product.id, req.body, {
    new: true
  });

  return res
    .status(200)
    .json({ message: 'Product updated', data: { product: productUpdate } });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(400).json({ message: 'Product not found!' });

  return res.status(204).json({ message: 'Product removed', data: null });
});
