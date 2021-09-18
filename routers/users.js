const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const usersController = require('../controllers/usersController');

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
router.get('/login', usersController.login);

//REGISTER
router.get('/register', usersController.register);
router.post('/register', upload.single('imagenUsuario'), usersController.saveRegister);

//CHANGE PASSWORD
router.get('/changePass', usersController.change);

module.exports = router;