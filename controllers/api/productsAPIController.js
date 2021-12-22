const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Product = db.Product;

const productsAPIController = {
    'list': (req, res) => {
        Product.findAll({
            include: ['category']
        })
        .then(producto => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: producto.length,
                    url: 'api/products'
                },
                data: producto
            }
                res.json(respuesta);
            })
    }
}

module.exports = productsAPIController;