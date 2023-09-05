const express = require('express');
const router = express.Router();
const userController = require('./controllers/usersController');
const authController = require('./controllers/authController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.postCreateUser);
router.put('/users/:id', userController.putUpdateUser);
router.post('/auth', authController.postAuthenticateUser);

module.exports = router;