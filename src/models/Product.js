const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
