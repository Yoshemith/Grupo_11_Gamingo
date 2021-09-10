//Requerir path
const path = require('path');
/*
 ** RUTAS A LOS RECURSOS **
*/
const controlador = {
    home: (req, res) => {
        //res.sendFile(path.resolve('./views/index.html'));
        res.render('./main/index'); //Renderizacion con ejs 
    },
    search: (req, res) => {
        res.render('./main/results'); //resultados de busqueda
    },
    shopping_cart: (req, res) => {
        res.render('./main/shoppingCart');
    }
};

module.exports = controlador;