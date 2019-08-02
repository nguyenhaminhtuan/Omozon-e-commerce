const Product = require('../models/Product');

exports.fetchProdcut = async function(req, res, next) {
  try {
    const products = await Product.find({});

    if (products) {
      res.status(200).json({
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

    if (!product) {
      res.status(400).json({ success: false, message: 'Get product failed' });
    } else {
      res.status(200).json({
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
    const { name, price, brand, description, category } = req.body;
    const isExisted = await Product.findOne({ name });

    if (isExisted) {
      res
        .status(400)
        .json({ success: false, message: 'Product name already exist' });
    } else {
      const newProduct = new Product({
        name,
        price,
        brand,
        description,
        category
      });
      const product = await newProduct.save();

      res
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
    const { name, price, brand, description, category } = await req.body;
    const product = await Product.updateOne(
      { _id },
      { name, price, brand, description, category }
    );

    if (!product) {
      res
        .status(400)
        .json({ success: false, message: 'Update product failed' });
    } else {
      res
        .status(200)
        .json({ success: true, message: 'Product updated' }, product);
    }
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const product = await Product.deleteOne({ _id });

    if (!product) {
      res
        .status(400)
        .json({ success: false, message: 'Remove product failed' });
    } else {
      res
        .status(200)
        .json({ success: true, message: 'Product removed', product });
    }
  } catch (error) {
    next(error);
  }
};
