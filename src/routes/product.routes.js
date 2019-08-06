const { Router } = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const productController = require('../controllers/product.controller');
const productSchema = require('../validations/product.validate');
const validate = require('../middlewares/validate');

const router = Router();

// Routes for all
router.get('/', productController.fetchProduct);
router.get('/:id', productController.getProductById);
// Admin routes
router.post(
  '/',
  auth,
  admin,
  validate(productSchema.product),
  productController.addProduct
);
router.put(
  '/:id',
  auth,
  admin,
  validate(productSchema.product),
  productController.updateProduct
);
router.delete('/:id', auth, admin, productController.removeProduct);

module.exports = router;
