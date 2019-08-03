const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const rolesCheck = require('../middlewares/rolesCheck');
const categoryController = require('../controllers/category.controller');

// Routes for all
router.get('/', categoryController.getAllCategory);
router.get('/:_id', categoryController.getCategoryById);

// Routes for admin
router.post('/add', authCheck, rolesCheck, categoryController.addCategory);
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
  categoryController.removeCategory
);
router.put(
  '/add-produdct-to-category/:_id',
  authCheck,
  rolesCheck,
  categoryController.addProductToCategory
);

module.exports = router;
