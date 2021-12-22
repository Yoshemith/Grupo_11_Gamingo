const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

//llamar a los modelos
const Category = db.Category;

const CategoriesAPIController = {
    'list': (req, res) => {
        Category.findAll()
        .then(categoria => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categoria.length,
                    url: 'api/categories'
                },
                data: categoria
            }
                res.json(respuesta);
            })
        }   
}

module.exports = CategoriesAPIController;