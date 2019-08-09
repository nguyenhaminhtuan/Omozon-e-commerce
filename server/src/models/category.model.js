const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  createAt: { type: Date, default: Date.now() }
});

// categorySchema.virtual('products', {
//   ref: 'Product',
//   foreginField: 'category',
//   localField: '_id'
// });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
