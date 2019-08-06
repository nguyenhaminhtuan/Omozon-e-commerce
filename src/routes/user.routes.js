const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const userSchema = require('../validations/user.validate');
const validate = require('../middlewares/validate');

const router = Router();

// For all
router.post('/', validate(userSchema.create), userController.createUser);
// User routes
router.get('/profile', auth, userController.viewProfile);
router.post(
  '/profile',
  auth,
  validate(userSchema.user),
  userController.updateProfile
);
router.post(
  '/change-password',
  auth,
  validate(userSchema.password),
  userController.changePassword
);
// Admin routes
router.get('/', auth, admin, userController.fetchUser);
router.get('/:id', auth, admin, userController.getUserById);

module.exports = router;
