const Product = require('../models/Product');
const Category = require('../models/Category');

exports.fetchProdcut = async function(req, res, next) {
  try {
    const products = await Product.find({});

    if (products) {
      return res.status(200).json({
        success: true,
        message: 'Get all product successfully',
        products
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const product = Product.findById(_id);

    if (product) {
      return res.status(200).json({
        success: true,
        message: `Get product ${product._id} successfully`,
        product
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async function(req, res, next) {
  try {
    const { name, price, brand, description, categories } = req.body;
    const isExisted = await Product.findOne({ name });

    if (isExisted) {
      return res
        .status(400)
        .json({ success: false, message: 'Product name already exist' });
    } else {
      const newProduct = new Product({
        name,
        price,
        brand,
        description,
        categories
      });

      categories.map(async function(category) {
        await Category.updateOne(
          { _id: category },
          { $push: { products: product } }
        );
      });

      const product = await newProduct.save();
      return res
        .status(200)
        .json({ success: true, message: 'Added product', product });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const { name, price, brand, description, categories } = await req.body;
    const product = await Product.findById(_id);

    if (product) {
      const categoriesRemoved = product.categories.filter(function(categoryId) {
        for (let i = 0; i < categories.length; i++) {
          return categories[i] !== categoryId;
        }
      });

      const productUpdated = await Product.updateOne(
        { _id },
        { name, price, brand, description, categories }
      );

      categoriesRemoved.map(async function(category) {
        await Category.updateOne(
          { _id: category },
          { $pull: { products: productUpdated._id } }
        );
      });

      return res.status(200).json({
        success: true,
        message: 'Product updated',
        product: productUpdated
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    const productRemoved = await Product.deleteOne({ _id });

    if (product) {
      product.categories.map(async function(category) {
        await Category.updateOne(
          { _id: category },
          { $pull: { products: product._id } }
        );
      });

      return res.status(200).json({
        success: true,
        message: 'Product removed',
        product: productRemoved
      });
    }
  } catch (error) {
    next(error);
  }
};
