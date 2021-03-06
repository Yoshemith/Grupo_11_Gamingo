const db = require('../database/models');
const sequelize = db.sequelize;

//Llamar a los modelos
const User = db.User;

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


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
                    //SI EL CORREO ESTA EN LA BD ENTONCES
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
            }).catch(err => {
                console.log(err);
           });
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
            User.findOne({ raw: true, where: { email: req.body.correo }}).then(userToLogin => {
                console.log(userToLogin);
                if(userToLogin != null || userToLogin != undefined){
                    let isValidPassword = bcrypt.compareSync(req.body.contraseña, userToLogin.password);
                    //console.log(isValidPassword);
                    if(isValidPassword){
                        req.session.usuarioLogeado = userToLogin;
                        if(req.body.recordar){
                            res.cookie('recordar', req.body.correo, { maxAge: (1000 * 60) * 5}); //seteando cookie 10 minutos
                        }
                        return res.redirect('/profile');
                    }
                }
                return res.render('./users/login', {
                    errors: {invalido: {msg: "**Credenciales invalidas, vuelve a intentar**"}
                }});
            }).catch(err => {
                console.log(err);
           });
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
    },
    profileData: (req, res)=>{
        resultado = req.session.usuarioLogeado;
        res.render('./users/editProfile');
    }, 
    updateProfile: (req, res)=>{
        resultado = req.session.usuarioLogeado;
        if (req.file != undefined){
            var upImage = req.file.filename;
        }else{
            var upImage = resultado.user_image;
        }
        let isValidPassword = bcrypt.compareSync(req.body.contraseña, resultado.password);
        if (isValidPassword){
                User.update({
                    firstname: req.body.nombre,
                    lastname: req.body.apellido,
                    user_image: upImage,
                },{
                    where: {
                        email: resultado.email
                    }
                });
            res.render('./users/profile', {
                user: req.session.usuarioLogeado
            });
        }
    },
    viewPass: (req, res) => {
        res.render('./users/editPass')
    },
    updatePass: (req, res) =>{
        resultado = req.session.usuarioLogeado;
        let isValidPassword = bcrypt.compareSync(req.body.contraseña, resultado.password);
        if (isValidPassword){
                User.update({
                    password: bcrypt.hashSync(req.body.contraseñaNueva, 10)
                },{
                    where: {
                        email: resultado.email
                    }
                });
            }
            res.render('./users/profile', {
                user: req.session.usuarioLogeado
            });
    },
    destroy: (req, res) => {
        resultado = req.session.usuarioLogeado;
		User.destroy({
            where: { 
                email: resultado.email
            }
        })
        res.redirect('/logout');
    },
    terminos: (req, res) => {
        res.render('./users/terminos');
    },
    aviso: (req, res) => {
        res.render('./users/aviso');
    }
};

module.exports = usersControlador;