const Product = require('../models/Product');
const Category = require('../models/Category');

exports.fetchProduct = async function(req, res, next) {
  try {
    const products = await Product.find({});

    if (products)
      return res
        .status(200)
        .json({ success: true, message: 'Fetched all product', products });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async function(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: `There is no product with id ${product.id}`
      });

    return res
      .status(200)
      .json({ success: true, message: 'Get product success', product });
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async function(req, res, next) {
  try {
    const { name, price, brand, description, categories } = req.body;
    const isExisted = await Product.findOne({ name });

    if (isExisted)
      return res
        .status(400)
        .json({ success: true, message: 'Product name already exist' });
    const newProduct = new Product({
      name,
      price,
      brand,
      description,
      categories
    });
    const product = await newProduct.save();
    categories.map(async category => {
      await Category.updateOne(
        { _id: category },
        { $push: { products: product._id } }
      );
    });

    return res
      .status(200)
      .json({ success: true, message: 'Added product', product });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async function(req, res, next) {
  try {
    const { categories } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: `There is no product with id ${product.id}`
      });

    product.categories.map(async category => {
      await Category.updateOne(
        { _id: category },
        { $pull: { products: product._id } }
      );
    });
    await Product.updateOne({ _id: product._id }, req.body);
    categories.map(async category => {
      await Category.updateOne(
        { _id: category },
        { $push: { products: product._id } }
      );
    });

    return res
      .status(200)
      .json({ success: true, message: 'Product added', product });
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async function(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: `There is no product with id ${product.id}`
      });

    product.categories.map(async category => [
      await Category.updateOne(
        { _id: category },
        { $pull: { products: product._id } }
      )
    ]);
    await Product.deleteOne({ _id: product._id });

    return res.status(200).json({ success: true, message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};
