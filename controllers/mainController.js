//Requerir path
const path = require('path');

/*
 ** RUTAS A LOS RECURSOS **
*/
const controlador = {
    home: (req, res) => {
        //res.sendFile(path.resolve('./views/index.html'));
        res.render('index'); //Renderizacion con ejs 
    },
    shopping_cart: (req, res) => {
        res.render('shoppingCart');
    },
    productDetails: (req, res) => {
        res.render('productDetail');
    }
};

module.exports = controlador;