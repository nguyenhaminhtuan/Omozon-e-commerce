const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  paid: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 },
  orderAt: { type: Date, default: Date.now() }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
