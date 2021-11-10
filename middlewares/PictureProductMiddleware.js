const multer = require('multer');
const path = require('path');

//IMAGEN DE PRODUCTO
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

const upload = multer({storage});

module.exports = upload;