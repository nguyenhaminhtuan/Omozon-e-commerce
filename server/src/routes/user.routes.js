const express = require('express');
const auth = require('../utils/auth');
const admin = require('../utils/admin');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/profile', auth, userController.viewProfile);
// router.post('/profile/update', auth, userController.updateProfile);
router.post('/profile/change-password', auth, userController.changePassword);

router.get('/', auth, admin, userController.getAllUsers);
router.get('/:id', auth, admin, userController.getUser);

module.exports = router;
