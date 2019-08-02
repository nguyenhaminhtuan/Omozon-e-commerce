const router = require('express').Router();
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
