const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);

// Development only
router.get('/create_admin', authController.createAdmin);

module.exports = router;
