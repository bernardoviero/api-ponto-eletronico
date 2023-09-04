const express = require('express');
const router = express.Router();
const userController = require('./controllers/usersController');

router.get('/users', userController.getAll);
router.post('/users', userController.postCreateUser);
router.get('/users/:email', userController.getUserByEmail);

module.exports = router;