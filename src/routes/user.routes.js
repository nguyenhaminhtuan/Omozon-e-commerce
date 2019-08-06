const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = Router();

// Check authentication for all user routes
router.use(auth);

// Admin routes
router.get('/', admin, userController.getAllUser);
router.get('/:id', admin, userController.getUserById);
// User routes
router.get('/profile', userController.viewProfile);
router.post('/profile/update', userController.updateProfile);

module.exports = router;
