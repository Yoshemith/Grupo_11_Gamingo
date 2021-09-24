const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator'); 

const productsController = require('../controllers/productsController');

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = path.join(__dirname, '../public/img/products');
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        console.log(file);
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

let upload = multer({ storage: storage });

/*** VALIDATIONS */

const validations = [
    body('name')
        .notEmpty().withMessage('Tienes que escribir un nombre').bail()
        .isLength({min: 5}).withMessage('Tiene que ser mayor a 5 caracteres'),
    body('category').notEmpty().withMessage('Tienes que elegir una categoria'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio'),
    body('description')
        .notEmpty().withMessage('Tienes que escribir una descripcion').bail()
        .isLength({min: 15}).withMessage('Tiene que ser mayor a 15 caracteres'),
    body('productImage').custom((value, { req }) =>{
        let file = req.file;
        let validExtensions = ['.jpg', '.png', 'jpeg'];
        if(!file) {
            throw new Error('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!validExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

/*** SHOW ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('productImage'), validations, productsController.store);  //file missing with d&d evenfileUpload.array

/*** DETAILS PRODUCT ***/ 
router.get('/:idProduct/', productsController.detail); 

/*** EDIT PRODUCT ***/ 
router.get('/:idProduct/edit', productsController.edit); 
router.put('/:idProduct/edit', upload.single('product-image'), productsController.update); 

/*** DELETE PRODUCT***/ 
router.delete('/:idProduct/delete', productsController.destroy); 


module.exports = router;