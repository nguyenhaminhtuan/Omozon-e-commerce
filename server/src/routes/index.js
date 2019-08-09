const express = require('express');
const categoryRoutes = require('./category.routes');
const productRotes = require('../routes/product.routes');

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRotes);

module.exports = router;
