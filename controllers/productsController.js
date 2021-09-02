const path = require('path');

const productsControlador = {
    create: (req, res) => {
        res.render('./products/createProduct');
    },
    update: (req, res) => {
        /* res.render('updateProduct'); */
    },
};

module.exports = productsControlador;