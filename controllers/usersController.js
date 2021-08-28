const path = require('path');

const usersControlador = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
};

module.exports = usersControlador;