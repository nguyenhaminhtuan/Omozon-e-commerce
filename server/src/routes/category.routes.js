const express = require('express');
const categoryController = require('../controllers/category.controller');
const categoryValidate = require('../validation/category.validate');
const validate = require('../utils/validate');
const auth = require('../utils/auth');
const admin = require('../utils/admin');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    auth,
    admin,
    validate(categoryValidate.category),
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryController.getCategory)
  .put(
    auth,
    admin,
    validate(categoryValidate.category),
    categoryController.updateCategory
  )
  .delete(auth, admin, categoryController.deleteCategory);

module.exports = router;
