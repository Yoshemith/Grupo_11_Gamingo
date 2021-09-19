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
        console.log(file);
        let imageName = file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname);
        cb(null, imageName);
    }
})

let upload = multer({ storage: storage });

/*** SHOW ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('product-image'), productsController.store);  //still file missing even with fileUpload.array

/*** DETAILS PRODUCT ***/ 
router.get('/:idProduct/', productsController.detail); 

/*** EDIT PRODUCT ***/ 
router.get('/:idProduct/edit', productsController.edit); 
router.put('/:idProduct/edit', upload.single('product-image'), productsController.update); 

/*** DELETE PRODUCT***/ 
router.delete('/:idProduct', productsController.destroy); 


module.exports = router;