const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
// EXPRESS VALIDATOR
const { body } = require('express-validator');

const usersController = require('../controllers/usersController');

//REQUERIR MIDDLEWARES
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// VALIDACIONES
const validacionRegistro = [
    body('nombre').notEmpty().withMessage('Escribe tu(s) nombre(s)'),
    body('apellido').notEmpty().withMessage('Escribe tus apellidos'),
    body('correo').notEmpty().withMessage('No puedes dejar vacio el email').bail().isEmail().withMessage('Debes poner un email valido'),
    body('contraseña').isLength({min:8}).withMessage('Contraseña requerida de minimo 8 caracteres')
]
const validacionLogin = [
    body('correo').notEmpty().withMessage('Escribe un correo electronico').bail().isEmail().withMessage('Debes poner un email valido'),
    body('contraseña').notEmpty().withMessage('Escribe una contraseña'),
]

//FOTO DE USUARIO
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let carpeta = path.join(__dirname, '../public/img/profileImages')
        cb(null, carpeta);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage});

//LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login',validacionLogin, usersController.loginValidation);

//REGISTER
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('imagenUsuario'), validacionRegistro, usersController.saveRegister);

//CHANGE PASSWORD
router.get('/changePass', usersController.change);

module.exports = router;