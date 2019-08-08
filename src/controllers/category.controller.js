const Category = require('../models/Category');
const Product = require('../models/Product');

exports.fetchCategory = async function(req, res, next) {
  try {
    const categories = await Category.find({});

    if (categories) {
      return res.status(200).json({
        success: true,
        message: 'Get all categories success',
        categories
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async function(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({
        success: false,
        message: `There is no category with id ${req.params.id}`
      });

    return res.status(200).json({
      success: true,
      message: `Get category ${category.id} success`,
      category
    });
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async function(req, res, next) {
  try {
    const { name } = req.body;
    const isExisted = await Category.findOne({ name });

    if (isExisted)
      return res
        .status(400)
        .json({ success: false, message: 'Category name already existed' });

    const category = new Category({
      name
    });
    await category.save();

    res
      .status(200)
      .json({ success: true, message: 'Category Added', category });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async function(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({
        success: false,
        message: `There is no category with id ${req.params.id}`
      });

    category.name = req.body.name;
    await category.save();

    return res
      .status(200)
      .json({ success: true, message: `Category ${category.id} updated` });
  } catch (error) {
    next(error);
  }
};

exports.removeCategory = async function(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({
        success: false,
        message: `There is no category with id ${req.params.id}`
      });

    category.products.map(async product => {
      await Product.updateOne(
        { _id: product._id },
        { $pull: { categories: category._id } }
      );
    });
    await Category.deleteOne({ _id: category._id });

    return res
      .status(200)
      .json({ success: true, message: `Category ${category.id} removed` });
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async function(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    const product = await Product.findById(req.body.productId);

    if (!category)
      return res.status(404).json({
        success: false,
        message: `There is no category with id ${req.params.id}`
      });

    if (!product)
      return res.status(404).json({
        success: false,
        message: `There is no product with id ${req.body.productId}`
      });

    const isExisted = category.products.find(
      productId => productId.toString() === product.id
    );

    if (isExisted)
      return res
        .status(400)
        .json({ success: false, message: 'Product already exist in category' });

    category.products.push(product._id);
    product.categories.push(category._id);

    await category.save();
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Added product ${product.id} to category ${category.id}`,
      category,
      product
    });
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async function(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    const product = await Product.findById(req.body.productId);

    if (!category)
      return res.status(404).json({
        success: false,
        message: `There is no category with id ${req.params.id}`
      });

    if (!product)
      return res.status(404).json({
        success: false,
        message: `There is no product with id ${req.body.productId}`
      });

    category.products.map(async product => {
      await Product.updateOne(
        { _id: product },
        { $pull: { categories: category._id } }
      );
    });
    await Category.updateOne(
      { _id: category._id },
      { $pull: { products: product._id } }
    );

    return res.status(200).json({
      success: true,
      message: `Product ${product.id} removed from category ${category.id}`
    });
  } catch (error) {
    next(error);
  }
};
