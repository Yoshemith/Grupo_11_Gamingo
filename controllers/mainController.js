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
    productDetails: (req, res) => {
        let htmlPath = path.resolve('./views/productDetail.html');
        res.sendFile(htmlPath);
    }
};

module.exports = controlador;