const router = require('express').Router();
const { celebrate } = require('celebrate');
const authCheck = require('../middlewares/auth');
const rolesCheck = require('../middlewares/rolesCheck');
const categoryController = require('../controllers/category.controller');
const categoryValidate = require('../validations/category.validate');

// Routes for all
router.get('/', categoryController.getAllCategory);
router.get(
  '/:_id',
  celebrate(categoryValidate.getId),
  categoryController.getCategoryById
);

// Routes for admin
router.post(
  '/add',
  authCheck,
  rolesCheck,
  celebrate(categoryValidate.addCategory),
  categoryController.addCategory
);
router.put(
  '/update/:_id',
  authCheck,
  rolesCheck,
  celebrate(categoryValidate.updateName),
  categoryController.updateCategory
);
router.delete(
  '/remove/:_id',
  authCheck,
  rolesCheck,
  celebrate(categoryValidate.getId),
  categoryController.removeCategory
);
router.put(
  '/add-product-to-category/:_id',
  authCheck,
  rolesCheck,
  celebrate(categoryValidate.addAndRemoveProduct),
  categoryController.addProductToCategory
);
router.put(
  '/remove-product-from-category/:_id',
  authCheck,
  rolesCheck,
  celebrate(categoryValidate.addAndRemoveProduct),
  categoryController.removeProductFromCategory
);

module.exports = router;
