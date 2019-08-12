const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidate = require('../validation/auth.validate');
const validate = require('../utils/validate');

const router = express.Router();

router.post('/login', validate(authValidate.login), authController.login);
router.post('/signup', validate(authValidate.signup), authController.signup);

module.exports = router;
