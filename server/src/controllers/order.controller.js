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

exports.getOrdersHistory = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user.id, paid: true });

  return res
    .status(200)
    .json({ message: 'Fetched all user orders', data: { orders } });
});
