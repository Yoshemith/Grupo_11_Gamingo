const path = require('path');

const productsControlador = {
    products: (req, res) => {
        res.render('./products/products');
    },
    create: (req, res) => {
        res.render('./products/createProduct');
    },
    update: (req, res) => {
        res.render('./products/updateProduct');
    },
    detail: (req, res) => {
        res.render('./products/productDetail');
    }
};

module.exports = productsControlador;