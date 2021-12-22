const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

//Llamar a los modelos
const User = db.User;

const usersAPIController = {
    'list': (req, res) => {
        User.findAll({
            include: ['user_types']
        })
        .then(usuario => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: usuario.length,
                    url: 'api/users'
                },
                data: usuario
            }
                res.json(respuesta);
            })
        }
}

module.exports = usersAPIController;