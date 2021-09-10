const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productsControlador = {
    index: (req, res) => {
        res.render('./products/products', {
			products,
			toThousand
		});
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