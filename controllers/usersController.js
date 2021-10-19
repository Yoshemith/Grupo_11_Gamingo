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
            let userInDB = usuarios.find(oneUser => oneUser['email'] === req.body.correo);
            if(userInDB){
                return res.render('./users/register', {
                    errors: {
                        correo: {
                            msg: 'Este email ya esta registrado'
                        }
                    },
                    old: req.body
                });
            }
            //SET DE LOS VALORES NUEVO USUARIO
            let upImage = req.file ? req.file.filename :  'user.png'; 
            let lastUser = usuarios.pop();
            let newId = lastUser ? lastUser.id + 1 : 1 ; 
            let newUsuario = {
                id: newId, //usuarios[usuarios.length - 1].id + 1,
                firstname: req.body.nombre,
                lastname: req.body.apellido,
                email: req.body.correo,
                password: bcrypt.hashSync(req.body.contraseña, 10),
                category: 'user',
                image: upImage
            };
            // GUARDAR LA INFORMACION EN JSON
            usuarios.push(newUsuario);
            usuariosJSON = JSON.stringify(usuarios,null,2);
            fs.writeFileSync('./data/users.json', usuariosJSON);
            res.redirect("/login");
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