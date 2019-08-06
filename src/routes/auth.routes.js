const router = require('express').Router();
const { celebrate } = require('celebrate');
const authController = require('../controllers/auth.controller');
const authValidate = require('../validations/auth.validate');

router.use(celebrate(authValidate.auth));
router.post('/login', authController.login);
router.post('/register', authController.register);

// Development only
router.get('/create-admin', authController.createAdmin);

module.exports = router;
