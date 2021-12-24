const express = require('express');
const router = express.Router();

//CONTROLLER
const productsAPIController = require('../../controllers/api/productsAPIController');

//ALL PRODUCTS
router.get('/', productsAPIController.list); 
//MOST RATED PRODUCT
router.get('/mostrated', productsAPIController.mostrated); 

module.exports = router;