const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  orderAt: { type: Date, default: Date.now() }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
