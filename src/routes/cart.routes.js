const { Router } = require('express');
const cartController = require('../controllers/cart.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.use(auth);
router.get('/', cartController.fetchCart);
router.post('/', cartController.addCart);

module.exports = router;
