const express = require('express');
const router = express.Router();

const usersController = require('../controllers/productsController');

//CREATE
router.get('/create', usersController.create);
//UPDATE
router.get('/update', usersController.update);

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