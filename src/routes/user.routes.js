const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authCheck = require('../middlewares/auth');

router.get('/', userController.testController);
router.get('/profile', authCheck, userController.viewProfile);
router.post('/profile/update', authCheck, userController.updateProfile);

module.exports = router;
