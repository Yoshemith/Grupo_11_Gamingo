const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

//LOGIN
router.get('/login', usersController.login);
//REGISTER
router.get('/register', usersController.register);

module.exports = router;