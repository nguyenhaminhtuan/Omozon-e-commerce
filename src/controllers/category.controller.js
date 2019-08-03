const Category = require('../models/Category');

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

exports.addProduct = async function(req, res, next) {
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

exports.removeProduct = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const category = await Category.deleteOne({ _id });

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: 'Category deleted', category });
    }
  } catch (error) {
    next(error);
  }
};
