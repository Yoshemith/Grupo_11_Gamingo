const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controlador = {
    home: (req, res) => {
        //res.sendFile(path.resolve('./views/index.html'));
        //res.render('./main/index'); //Renderizacion con ejs 
        res.render('./main/index', {
			products,
			toThousand
		});
    },
    search: (req, res) => {
        res.render('./main/results'); //resultados de busqueda
    },
    shopping_cart: (req, res) => {
        res.render('./main/shoppingCart');
    }
};

module.exports = controlador;