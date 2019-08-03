const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const rolesCheck = require('../middlewares/rolesCheck');
const productController = require('../controllers/product.controller');

// Routes for all
router.get('/', productController.fetchProdcut);
router.get('/:_id', productController.getProductById);

// Admin routes
router.post('/add', authCheck, rolesCheck, productController.addProduct);
router.put(
  '/update/:_id',
  authCheck,
  rolesCheck,
  productController.updateProduct
);
router.delete(
  '/remove/:_id',
  authCheck,
  rolesCheck,
  productController.removeProduct
);
module.exports = router;
