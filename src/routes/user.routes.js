const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.testController);

module.exports = router;
