const express = require('express');
const multer = require('multer');
const productController = require('../controllers/product.controller');
const productValidate = require('../validation/product.validate');
const validate = require('../utils/validate');
const auth = require('../utils/auth');
const admin = require('../utils/admin');
const multerConfig = require('../utils/multer');

const router = express.Router();
const upload = multer({
  storage: multerConfig.products,
  fileFilter: multerConfig.filter
});

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    auth,
    admin,
    upload.single('image'),
    validate(productValidate.product),
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .put(
    auth,
    admin,
    upload.single('image'),
    validate(productValidate.product),
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;
