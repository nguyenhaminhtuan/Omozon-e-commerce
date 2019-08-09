const express = require('express');
const productController = require('../controllers/product.controller');
const productValidate = require('../validation/product.validate');
const validate = require('../utils/validate');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(validate(productValidate.product), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .put(validate(productValidate.product), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
