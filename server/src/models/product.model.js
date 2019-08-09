const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 10000, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
