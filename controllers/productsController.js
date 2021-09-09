const path = require('path');

const productsControlador = {
    index: (req, res) => {
        res.render('./products/products');
    },
    detail: (req, res) => {
        res.render('./products/productDetail');
    },
    create: (req, res) => {
        res.render('./products/createProduct');
    },
    store: (req, res) => {

    },
    edit: (req, res) => {
        res.render('./products/updateProduct');
    },
    update: (req, res) => {
        
    },
    destroy: (req, res) => {
        
    }
};

module.exports = productsControlador;