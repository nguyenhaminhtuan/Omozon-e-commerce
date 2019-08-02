const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authCheck = require('../middlewares/auth');

// Check authentication for all user routes
router.use(authCheck);

// Admin routes
router.get('/', userController.getAllUser);
router.get('/', userController.getUserById);

// User routes
router.get('/profile', userController.viewProfile);
router.post('/profile/update', userController.updateProfile);
module.exports = router;
