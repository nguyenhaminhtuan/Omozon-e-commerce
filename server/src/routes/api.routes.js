const express = require('express');
const apiController = require('../controllers/api.controllers');

const router = express.Router();

router.route('/').get(apiController.getAllApis);

module.exports = router;
