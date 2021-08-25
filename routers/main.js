const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

//HOME
router.get('/', mainController.home)
//SHOPPING_CART
router.get('/carrito', mainController.carrito)
//LOGIN
router.get('/login', mainController.login)
//REGISTER
router.get('/register', mainController.register)
//PRODUCT DETAIL
router.get('/productDetail', mainController.productDetails);

module.exports = router;

