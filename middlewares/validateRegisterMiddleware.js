// EXPRESS VALIDATOR
const { body } = require('express-validator');

// VALIDACIONES
const validacionRegistro = [
    body('nombre').notEmpty().withMessage('Escribe tu(s) nombre(s)'),
    body('apellido').notEmpty().withMessage('Escribe tus apellidos'),
    body('correo').notEmpty().withMessage('No puedes dejar vacio el email').bail().isEmail().withMessage('Debes poner un email valido'),
    body('contraseña').isLength({min:8}).withMessage('Contraseña requerida de minimo 8 caracteres')
]

module.exports = validacionRegistro;