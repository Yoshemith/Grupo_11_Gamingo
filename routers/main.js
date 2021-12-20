const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

//HOME
router.get('/', mainController.home)
//SWITCH
router.get('/switch', mainController.switch)
//XBOXONE
router.get('/xboxone', mainController.xboxone)
//XBOX360
router.get('/xbox360', mainController.xbox360)
//PS5
router.get('/ps5', mainController.ps5)
//PS4
router.get('/ps4', mainController.ps4)
//SHOPPING_CART
router.get('/shopping-cart', mainController.shopping_cart)
//RESULTS
router.get('/search', mainController.search);

router.get('/section/:idCat', mainController.section);

module.exports = router;

