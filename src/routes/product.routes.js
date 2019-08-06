const { Router } = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const productController = require('../controllers/product.controller');

const router = Router();

// Routes for all
router.get('/', productController.fetchProdcut);
router.get('/:id', productController.getProductById);
// Admin routes
router.post('/', auth, admin, productController.addProduct);
router.put('/:id', auth, admin, productController.updateProduct);
router.delete('/:id', auth, admin, productController.removeProduct);

module.exports = router;
