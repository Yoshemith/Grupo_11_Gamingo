// EXPRESS VALIDATOR
const { body } = require('express-validator');
const path = require('path');

/*** VALIDATIONS */
const validationsProduct = [
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
            //throw new Error('Tienes que subir una imagen');
            //Comentado solo por pruebas, usarlo para subir imagenes obligatoriamente
            //al no tener imagen, en el controller te asigna una imagen pro default
            //descomentar el throw new error para subir imagen obligatoriamente
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!validExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validationsProduct;