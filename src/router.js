const express = require('express');
const router = express.Router();
const userController = require('./controllers/usersController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.postCreateUser);
router.put('/users/email/:id', userController.putEmail);

module.exports = router;