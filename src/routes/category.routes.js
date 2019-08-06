const { Router } = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const categoryController = require('../controllers/category.controller');

const router = Router();

router.put('/:id/add-product', auth, admin, categoryController.addProduct);
router.put(
  '/:id/remove-product',
  auth,
  admin,
  categoryController.removeProduct
);
router.get('/', categoryController.fetchCategory);
router.get('/:id', categoryController.getCategoryById);
router.post('/', auth, admin, categoryController.addCategory);
router.put('/:id', auth, admin, categoryController.updateCategory);
router.delete('/:id', auth, admin, categoryController.removeCategory);

module.exports = router;
