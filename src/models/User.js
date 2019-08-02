const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  orders: { type: Schema.Types.ObjectId, ref: 'Order' },
  createAt: { type: Date, default: Date.now() }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
