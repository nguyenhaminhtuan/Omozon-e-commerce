const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const userSchema = require('../validations/user.validate');
const validate = require('../middlewares/validate');

const router = Router();

// For all
router.post('/', userController.createUser);
// Admin routes
router.get('/', auth, admin, userController.fetchUser);
router.get('/:id', auth, admin, userController.getUserById);
// User routes
router.get('/profile', auth, userController.viewProfile);
router.post('/profile', auth, userController.updateProfile);
router.post('/change-password', auth, userController.changePassword);

module.exports = router;
