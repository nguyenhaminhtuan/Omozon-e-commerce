const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authSchema = require('../validations/auth.validate');
const validte = require('../middlewares/validate');

const router = Router();

router.post('/login', validte(authSchema.login), authController.login);
router.post('/register', validte(authSchema.register), authController.register);

// Development only
router.get('/create-admin', authController.createAdmin);

module.exports = router;
