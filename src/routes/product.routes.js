const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.testController);

module.exports = router;
