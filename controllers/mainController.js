//Requerir path
const path = require('path');

/*
 ** RUTAS A LOS RECURSOS **
*/
const controlador = {
    home: (req, res) => {
        res.sendFile(path.resolve('./views/index.html'));
        //res.render('index') //Renderizacion con ejs 
    },
    carrito: (req, res) => {
        res.sendFile(path.resolve('./views/shop_cart.html'));
    },
    login: (req, res) => {
        let htmlPath = path.resolve('./views/login.html');
        res.sendFile(htmlPath);
    },
    register: (req, res) => {
        let htmlPath = path.resolve('./views/register.html');
        res.sendFile(htmlPath);
    },
    productDetails: (req, res) => {
        let htmlPath = path.resolve('./views/productDetail.html');
        res.sendFile(htmlPath);
    }
};

module.exports = controlador;