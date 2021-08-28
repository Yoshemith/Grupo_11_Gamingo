const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

//HOME
router.get('/', mainController.home)
//SHOPPING_CART
router.get('/carrito', mainController.carrito)
//PRODUCT DETAIL
router.get('/productDetail', mainController.productDetails)

module.exports = router;

