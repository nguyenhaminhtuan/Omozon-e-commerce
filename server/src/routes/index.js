const express = require('express');
const categoryRoutes = require('./category.routes');
const productRotes = require('../routes/product.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRotes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
