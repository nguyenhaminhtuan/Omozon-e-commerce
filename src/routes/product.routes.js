const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const productController = require('../controllers/product.controller');

// Routes for all
router.get('/', productController.fetchProdcut);
router.get('/:_id', productController.getProductById);

// Admin routes
router.post('/add', authCheck, productController.addProduct);
router.put('/update/:_id', authCheck, productController.updateProduct);
router.delete('/remove/:_id', authCheck, productController.removeProduct);
module.exports = router;
