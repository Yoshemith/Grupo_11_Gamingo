const express = require('express');
const router = express.Router();

//CONTROLLER
const productsAPIController = require('../../controllers/api/productsAPIController');

//ALL PRODUCTS
router.get('/', productsAPIController.list); 


module.exports = router;