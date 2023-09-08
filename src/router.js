const express = require('express');
const router = express.Router();
const userController = require('./controllers/usersController');
const authController = require('./controllers/authController');
const emailController = require('./controllers/emailController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.postCreateUser);
router.put('/users/:id', userController.putUpdateUser);
router.post('/auth', authController.postAuthenticateUser);
router.post('/email/send', emailController.postSendVerificationEmail);
router.get('/email/verify', emailController.getVerifyCode);

module.exports = router;