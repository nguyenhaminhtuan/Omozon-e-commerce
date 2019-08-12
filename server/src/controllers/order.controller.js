const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find()
    .where({ paid: true })
    .sort({ orderAt: -1 });

  return res
    .status(200)
    .json({ message: 'Fetched all orders', data: { orders } });
});

exports.getOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).where({ paid: true });

  if (!order) return res.status(404).json({ message: 'Order not found!' });

  return res
    .status(200)
    .json({ message: 'Get order success', data: { order } });
});

exports.getAllCarts = catchAsync(async (req, res) => {
  const carts = await Order.find({ user: req.user.id, paid: false }).sort({
    orderAt: -1
  });

  return res
    .status(200)
    .json({ message: 'Fetched all user carts', data: { carts } });
});

exports.getOrdersHistory = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user.id, paid: true });

  return res
    .status(200)
    .json({ message: 'Fetched all user orders', data: { orders } });
});

exports.getCart = catchAsync(async (req, res) => {
  const cart = await Order.findOne({
    user: req.user.id,
    _id: req.params.id,
    paid: false
  });

  if (!cart) return res.status(404).json({ message: 'Order not found!' });

  return res
    .status(200)
    .json({ message: 'Get user cart success', data: { cart } });
});

exports.createCart = catchAsync(async (req, res) => {
  const cart = new Order(req.body);
  await cart.save();

  return res.status(201).json({ message: 'Created order', data: { cart } });
});

exports.updateQuantity = catchAsync(async (req, res) => {
  const order = await Order.updateOne(
    { _id: req.params.id, user: req.user.id },
    { $set: req.body }
  );

  if (!order) return res.status(404).json({ message: 'Order not found!' });

  return res
    .status(200)
    .json({ message: 'Order quantity updated', data: { order } });
});

exports.paid = catchAsync(async (req, res) => {
  const order = await Order.updateOne(
    { _id: req.params.id, user: req.user.id },
    { $set: req.body }
  );

  if (!order)
    return res.status(200).json({ message: 'User paid', data: { order } });
});

exports.removeUserOrder = catchAsync(async (req, res) => {
  const cart = await Order.deleteOne({
    _id: req.params.id,
    user: req.user.id,
    paid: false
  });

  if (!cart) return res.status(404).json({ message: 'Order not found!' });

  return res.status(204).json({ message: 'Cart removed', data: null });
});
