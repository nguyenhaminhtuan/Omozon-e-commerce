const express = require('express');
const orderController = require('../controllers/order.controller');
const auth = require('../utils/auth');
const admin = require('../utils/admin');

const router = express.Router();

router.use(auth, admin);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getAllCarts);

module.exports = router;
