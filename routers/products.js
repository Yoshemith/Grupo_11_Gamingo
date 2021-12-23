const express = require('express');
const router = express.Router();

//CONTROLLER
const productsController = require('../controllers/productsController');

//MIDDLEWARES
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/PictureProductMiddleware');
const validationsProduct = require('../middlewares/validateProductMiddleware');

/*** SHOW ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE PRODUCT ***/ 
router.get('/create', adminMiddleware, productsController.create); 
router.post('/', upload.single('productImage'), validationsProduct, productsController.store);  //file missing with d&d evenfileUpload.array

/*** DETAILS PRODUCT ***/ 
router.get('/:idProduct/', productsController.detail);

/*** EDIT PRODUCT ***/ 
router.get('/:idProduct/edit', adminMiddleware, productsController.edit); 
router.put('/:idProduct/edit', upload.single('product-image'), productsController.update); 

/*** DELETE PRODUCT***/ 
router.delete('/delete/:idProduct', productsController.destroy); 


module.exports = router;