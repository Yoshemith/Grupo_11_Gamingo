const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const db = require('../database/models');
const sequelize = db.sequelize;

//llamar a los modelos
const Product = db.Product;

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
        let search = req.query.keywords;
		let productsToSearch = products.filter(product => product.name.toLowerCase().includes(search));	
		res.render('./main/results', { 
			products: productsToSearch, 
			search,
			toThousand,
		});
    },
    shopping_cart: (req, res) => {
        res.render('./main/shoppingCart');
    }
};

module.exports = controlador;

