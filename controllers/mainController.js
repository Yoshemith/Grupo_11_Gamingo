const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

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
		Product.findAll({
            where: {
                name: {
                    [Op.substring]: search
                }
              }
        }).then(function(products){
            res.render('./main/results', { 
                products: products, 
                search,
                toThousand,
            });
        })
        .catch(err => {
            console.log(err);
       });
    },
    shopping_cart: (req, res) => {
        res.render('./main/shoppingCart');
    }
};

module.exports = controlador;

