const express = require('express');
const router = express.Router();

const usersController = require('../controllers/productsController');

//CREATE
router.get('/create', usersController.create);
//UPDATE
router.get('/update', usersController.update);

module.exports = router;