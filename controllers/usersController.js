const db = require('../database/models');
const sequelize = db.sequelize;

//Llamar a los modelos
const User = db.User;
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

let archivoUsuario = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
let usuarios;
if (archivoUsuario == ""){
    usuarios = [];
}else{
    usuarios = JSON.parse(archivoUsuario);
}

const usersControlador = {
    register: (req, res) => {
        res.render('./users/register');
    },
    registerProcess: (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()){
            return res.render('./users/register', {
                errors: errores.mapped(),
                old: req.body
            })
        }else{
            // CHECAMOS EMAIL EXISTENTE
            let userInDB = null;
            User.findOne({ raw: true, where: { email: req.body.correo }}).then(data => {
                userInDB = data;
                console.log(userInDB);
                if(userInDB != null || userInDB != undefined){
                    return res.render('./users/register', {
                        errors: {
                            correo: {
                                msg: 'Este email ya esta registrado'
                            }
                        },
                        old: req.body
                    });
                }else{
                    let upImage = req.file ? req.file.filename :  'user.png'; 
                    // GUARDAR LA INFORMACION 
                    User.create({
                        firstname: req.body.nombre,
                        lastname: req.body.apellido,
                        email: req.body.correo,
                        password: bcrypt.hashSync(req.body.contraseña, 10),
                        user_image: upImage,
                        id_typeUser: 3
                    });
                    res.redirect("/login");
                }
            });
            console.log("USERINDB-->" +userInDB);
        }
    },
    login: (req, res) => {
        res.render('./users/login');
    },
    loginProcess: (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()){
            return res.render('./users/login', {
                errors: errores.mapped(),
                old: req.body
            })
        }else{
            let userToLogin = usuarios.find(oneUser => oneUser['email'] === req.body.correo);
            console.log(userToLogin);
            if(userToLogin){
                let isValidPassword = bcrypt.compareSync(req.body.contraseña, userToLogin.password);
                console.log(isValidPassword);
                if(isValidPassword){
                    //delete userToLogin.password; //borra propiedad password del usuario logeado en el session
                    //userToLogin.password = ''; //bug al tratar de borrar el password
                    req.session.usuarioLogeado = userToLogin;
                    if(req.body.recordar){
                        res.cookie('recordar', req.body.correo, { maxAge: (1000 * 60) * 2}); //seteando cookie 2 minutos
                    }
                    return res.redirect('/profile');
                }
            }
            return res.render('./users/login', {
                errors: {invalido: {msg: "**Credenciales invalidas, vuelve a intentar**"}
            }});
        }
    },
    changePass: (req, res) => {
        res.render('./users/changePass');
    },
    dashboard: (req, res)=>{
        res.render('./users/dashboard', {
            user: req.session.usuarioLogeado
        });
    },
    profile: (req, res)=>{
        res.render('./users/profile', {
            user: req.session.usuarioLogeado
        });
    },
    logout: (req, res)=>{
        res.clearCookie('recordar');
        req.session.destroy();
        return res.redirect('/');
    }
    
};

module.exports = usersControlador;