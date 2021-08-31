const path = require('path');

const productsControlador = {
    create: (req, res) => {
        res.render('createProduct');
    },
    update: (req, res) => {
        /* res.render('updateProduct'); */
    },
};

module.exports = productsControlador;