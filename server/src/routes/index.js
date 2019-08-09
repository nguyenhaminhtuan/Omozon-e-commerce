const express = require('express');
const categoryRoutes = require('./category.routes');

const router = express.Router();

router.use('/categories', categoryRoutes);

module.exports = router;
