const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productsController = require('../controllers/productsController');

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = path.join(__dirname, '../public/img/products');
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        let imageName = file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname);
        cb(null, imageName);
    }
})

let fileUpload = multer({ storage });

//SHOW ALL
//router.get('/products', productsController.index);
//CREATE
//router.get('/create', productsController.create);
//UPDATE
//router.get('/update', productsController.edit);
//PRODUCT DETAIL
//router.get('/productDetail', productsController.detail)

/*** SHOW ALL PRODUCTS ***/ 
router.get('/products', productsController.index); 

/*** CREATE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', productsController.store); 

/*** DETAILS PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 

/*** DELETE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;