const express = require('express');
const router = express.Router();

//CONTROLLER
const usersAPIController = require('../../controllers/api/usersAPIController');

//ALL USERS
router.get('/', usersAPIController.list); 

module.exports = router;