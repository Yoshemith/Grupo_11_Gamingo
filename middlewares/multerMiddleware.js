const multer = require('multer');
const path = require('path');

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

module.exports = upload;