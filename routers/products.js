const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

//SHOW ALL
router.get('/products', productsController.products);
//CREATE
router.get('/create', productsController.create);
//UPDATE
router.get('/update', productsController.update);
//PRODUCT DETAIL
router.get('/productDetail', productsController.detail)

/*** SHOW ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE PRODUCT ***/ 
//router.get('/create', productsController.create); 
//router.post('/', productsController.store); 

/*** DETAILS PRODUCT ***/ 
//router.get('/:id/', productsController.detail); 

/*** EDIT PRODUCT ***/ 
//router.get('/:id/edit', productsController.edit); 
//router.put('/:id', productsController.update); 

/*** DELETE PRODUCT***/ 
//router.delete('/:id', productsController.destroy); 


module.exports = router;