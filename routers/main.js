const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

//HOME
router.get('/', mainController.home)
//SHOPPING_CART
router.get('/shopping-cart', mainController.shopping_cart)
//RESULTS

module.exports = router;

