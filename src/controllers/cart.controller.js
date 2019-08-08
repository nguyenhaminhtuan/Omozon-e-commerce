const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.fetchCart = async function(req, res, next) {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'orders',
      match: { isPaid: false }
    });

    return res
      .status(200)
      .json({ success: true, message: 'Fetched all cart', carts: user.orders });
  } catch (error) {
    next(error);
  }
};

exports.addCart = async function(req, res, next) {
  try {
    const query = { user: req.user.id, product: req.body.productId };
    const product = await Product.findById(req.body.productId);
    const isExisted = await Order.findOne(query);

    if (!product)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product id' });

    if (isExisted)
      return res
        .status(400)
        .json({ success: false, message: 'Order already existed' });

    const order = new Order(query);
    const cart = await order.save();
    await User.updateOne({ _id: req.user.id }, { $push: { orders: cart._id } });

    return res.status(200).json({ success: true, message: 'Added cart', cart });
  } catch (error) {
    next(error);
  }
};
