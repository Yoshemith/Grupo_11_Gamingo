const path = require('path');

const usersControlador = {
    login: (req, res) => {
        res.render('./users/login');
    },
    register: (req, res) => {
        res.render('./users/register');
    },
    change: (req, res) => {
        res.render('./users/changePass');
    },
    saveRegister: (req, res) => {
        
    },
};

module.exports = usersControlador;