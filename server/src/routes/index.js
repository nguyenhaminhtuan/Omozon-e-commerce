const express = require('express');
const apiRoutes = require('./api.routes');

const router = express.Router();

router.use('/apis', apiRoutes);

module.exports = router;
