const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const rolesCheck = require('../middlewares/rolesCheck');
const categoryController = require('../controllers/category.controller');

// Routes for all
router.get('/', categoryController.getAllCategory);
router.get('/:_id', categoryController.getCategoryById);

// Routes for admin
router.post('/add', categoryController.addProduct);
router.put(
  '/update/:_id',
  authCheck,
  rolesCheck,
  categoryController.updateCategory
);
router.delete(
  '/remove/:_id',
  authCheck,
  rolesCheck,
  categoryController.removeProduct
);

module.exports = router;
