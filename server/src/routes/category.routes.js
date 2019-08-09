const express = require('express');
const categoryController = require('../controllers/category.controller');
const categoryValidate = require('../validation/category.validate');
const validate = require('../utils/validate');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(validate(categoryValidate), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .put(validate(categoryValidate), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
