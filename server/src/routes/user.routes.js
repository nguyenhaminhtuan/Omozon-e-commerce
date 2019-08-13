const express = require('express');
const auth = require('../utils/auth');
const admin = require('../utils/admin');
const userController = require('../controllers/user.controller');
const userValidate = require('../validation/user.validate');
const cartValidate = require('../validation/cart.validate');
const validate = require('../utils/validate');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.get('/profile', auth, userController.viewProfile);
// router.post('/profile/update', auth, userController.updateProfile);
router.post(
  '/profile/change-password',
  auth,
  validate(userValidate.changePassword),
  userController.changePassword
);

router.get('/orders', auth, orderController.getOrdersHistory);

router
  .route('/carts')
  .get(auth, cartController.getAllCarts)
  .post(auth, validate(cartValidate.cart), cartController.createCart);

router.patch(
  '/carts/quantity/:id',
  auth,
  validate(cartValidate.quantity),
  cartController.updateQuantity
);

router
  .route('/carts/:id')
  .get(auth, cartController.getCart)
  .patch(auth, validate(cartValidate.paid), cartController.paid)
  .delete(auth, cartController.removeCart);

router.get('/', auth, admin, userController.getAllUsers);
router.get('/:id', auth, admin, userController.getUser);

module.exports = router;
