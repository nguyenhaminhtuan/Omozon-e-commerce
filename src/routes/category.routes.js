const { Router } = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const categoryController = require('../controllers/category.controller');

const router = Router();

router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryById);
router.post('/', auth, admin, categoryController.addCategory);
router.put('/:id', auth, admin, categoryController.updateCategory);
router.delete('/:id', auth, admin, categoryController.removeCategory);
router.put(
  '/:id/add-product',
  auth,
  admin,
  categoryController.addProductToCategory
);
router.put(
  '/:id/remove-product',
  auth,
  admin,
  categoryController.removeProductFromCategory
);

module.exports = router;
