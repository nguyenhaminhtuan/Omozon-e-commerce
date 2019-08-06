const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getAllCategory = async function(req, res, next) {
  try {
    const categories = await Category.find({});
    return res
      .status(200)
      .json({ success: true, message: 'Get all Category success', categories });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const category = await Category.findById(_id);

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: `Category ${category._id}` });
    }
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async function(req, res, next) {
  try {
    const { name } = req.body;
    const isExisted = await Category.findOne({ name });

    if (isExisted) {
      return res
        .status(400)
        .json({ success: false, message: 'Category name already exist' });
    } else {
      const newCategory = new Category({
        name
      });
      const category = await newCategory.save();

      return res
        .status(200)
        .json({ success: true, message: 'Category added', category });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const { name } = req.body;
    const category = await Category.updateOne({ _id }, { name });

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: 'Category updated', category });
    }
  } catch (error) {
    next(error);
  }
};

exports.removeCategory = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const category = await Category.deleteOne({ _id });

    if (category) {
      category.products.map(async function(product) {
        await Product.updateOne(
          { _id: product },
          { $pull: { categories: category._id } }
        );
      });

      return res
        .status(200)
        .json({ success: true, message: 'Category deleted', category });
    }
  } catch (error) {
    next(error);
  }
};

exports.addProductToCategory = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const { productId } = req.body;
    const category = await Category.findById(_id);
    const product = await Product.findById(productId);

    // Kiểm tra tồn tại product trong category
    // Update products trong category
    // Update categories trong product

    if (product) {
      await Product.updateOne(
        { _id: product._id },
        { $push: { categories: category._id } }
      );
      await Category.updateOne({ _id }, { $push: { products: product._id } });

      return res.status(200).json({
        success: true,
        message: `Added product ${product._id} to category ${_id}`,
        product
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.removeProductFromCategory = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const { productId } = req.body;
    const product = await Product.findById(productId);
    const category = await Category.findById(_id);

    // Kiểm tra tồn tại product trong category
    // Update products trong category
    // Update categories trong product

    if (product) {
      await Category.updateOne({ _id }, { $pull: { products: product._id } });
      await Product.updateOne(
        { _id: product._id },
        { $pull: { categories: category._id } }
      );

      return res.status(200).json({
        success: true,
        message: `Product ${product._id} removed from category ${_id}`,
        product
      });
    }
  } catch (error) {
    next(error);
  }
};
