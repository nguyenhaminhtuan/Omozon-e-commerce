const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, min: 10000, required: true },
  brand: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  createAt: { type: Date, default: Date.now() }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
