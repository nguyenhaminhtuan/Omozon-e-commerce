const Order = require('../models/order.model');
const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllCarts = catchAsync(async (req, res) => {
  const carts = await Order.find({ user: req.user.id, paid: false }).sort({
    orderAt: -1
  });

  return res
    .status(200)
    .json({ message: 'Fetched all user carts', data: { carts } });
});

exports.getCart = catchAsync(async (req, res) => {
  const cart = await Order.findOne({
    _id: req.params.id,
    user: req.user.id,
    paid: false
  });

  if (!cart) return res.status(404).json({ message: 'Cart not found!' });

  return res
    .status(200)
    .json({ message: 'Get user cart success', data: { cart } });
});

exports.createCart = catchAsync(async (req, res) => {
  const quantity = !req.body.quantity ? undefined : req.body.quantity;
  const product = await Product.findById(req.body.productId);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  const cart = new Order({
    user: req.user.id,
    product: req.body.productId,
    quantity
  });
  await cart.save();

  return res.status(201).json({ message: 'Cart created', data: { cart } });
});

exports.updateQuantity = catchAsync(async (req, res) => {
  const order = await Order.updateOne(
    { _id: req.params.id, user: req.user.id },
    { $set: { quantity: req.body.quantity } }
  );

  if (!order) return res.status(404).json({ message: 'Cart not found!' });

  return res
    .status(200)
    .json({ message: 'Order quantity updated', data: { order } });
});

exports.paid = catchAsync(async (req, res) => {
  const cart = await Order.findOne({
    _id: req.params.id,
    user: req.user.id,
    paid: false
  });

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.paid = req.body.paid;
  const order = await cart.save();

  return res.status(200).json({ message: 'User paid', data: { order } });
});

exports.removeCart = catchAsync(async (req, res) => {
  const cart = await Order.deleteOne({
    _id: req.params.id,
    user: req.user.id,
    paid: false
  });

  if (!cart) return res.status(404).json({ message: 'Cart not found!' });

  return res.status(204).json({ message: 'Cart removed', data: null });
});
