// EXPRESS VALIDATOR
const { body } = require('express-validator');

const validacionLogin = [
    body('correo').notEmpty().withMessage('Escribe un correo electronico').bail().isEmail().withMessage('Debes poner un email valido'),
    body('contraseña').notEmpty().withMessage('Escribe una contraseña'),
]

module.exports = validacionLogin;