const { Router } = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const categoryController = require('../controllers/category.controller');
const categorySchema = require('../validations/category.validate');
const validate = require('../middlewares/validate');

const router = Router();

router.put(
  '/:id/add-product',
  auth,
  admin,
  validate(categorySchema.product),
  categoryController.addProduct
);
router.put(
  '/:id/remove-product',
  auth,
  admin,
  validate(categorySchema.product),
  categoryController.removeProduct
);
router.get('/', categoryController.fetchCategory);
router.get('/:id', categoryController.getCategoryById);
router.post(
  '/',
  auth,
  admin,
  validate(categorySchema.category),
  categoryController.addCategory
);
router.put(
  '/:id',
  auth,
  admin,
  validate(categorySchema.category),
  categoryController.updateCategory
);
router.delete('/:id', auth, admin, categoryController.removeCategory);

module.exports = router;
