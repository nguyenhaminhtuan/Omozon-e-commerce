const express = require('express');
const auth = require('../utils/auth');
const admin = require('../utils/admin');
const userController = require('../controllers/user.controller');
const userValidate = require('../validation/user.validate');
const validate = require('../utils/validate');

const router = express.Router();

router.get('/profile', auth, userController.viewProfile);
// router.post('/profile/update', auth, userController.updateProfile);
router.post(
  '/profile/change-password',
  auth,
  validate(userValidate.changePassword),
  userController.changePassword
);

router.get('/', auth, admin, userController.getAllUsers);
router.get('/:id', auth, admin, userController.getUser);

module.exports = router;
