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
    login: (req, res) => {
        res.render('./users/login');
    },
    loginValidation: (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()){
            return res.render('./users/login', {
                errors: errores.mapped(),
                old: req.body
            })
        }else{
            for(let i=0; i < usuarios.length; i++){
                if (usuarios[i].email == req.body.correo){
                    if(bcrypt.compareSync(req.body.contraseña, usuarios[i].password)){
                        var usuarioLogeado = usuarios[i];
                        break;
                    }
                }
            }
            if (usuarioLogeado == undefined){
                return res.render('./users/login', {
                    errors: {invalido: {msg: "**Credenciales invalidas, vuelve a intentar**"}
                }})
            }
        
            req.session.usuarioLogeado = usuarioLogeado;

            if(req.body.recordar != undefined){
                res.cookie('recordar',usuarioLogeado.email, {maxAge: 60000});
            }

            res.send('INGRESO EL USUARIO ' + usuarioLogeado.email + ' CORRECTAMENTE');
        }
    },
    register: (req, res) => {
        res.render('./users/register');
    },
    change: (req, res) => {
        res.render('./users/changePass');
    },
    saveRegister: (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()){
            return res.render('./users/register', {
                errors: errores.mapped(),
                old: req.body
            })
        }else{
            
            if(req.file){
                // OBTENER INFORMACION DEL HTML
                let usuario = {
                    firstname: req.body.nombre,
                    lastname: req.body.apellido,
                    email: req.body.correo,
                    password: bcrypt.hashSync(req.body.contraseña, 10),
                    category: 'user',
                    image: req.file.filename
                }
                // GUARDAR LA INFORMACION EN JSON
                usuarios.push(usuario);
                usuariosJSON = JSON.stringify(usuarios,null,2);
                fs.writeFileSync('./data/users.json', usuariosJSON);
            }else{
                // OBTENER INFORMACION DEL HTML
                let usuario = {
                    id: usuarios.length,
                    firstname: req.body.nombre,
                    lastname: req.body.apellido,
                    email: req.body.correo,
                    password: bcrypt.hashSync(req.body.contraseña, 10),
                    category: 'user',
                    image: 'user.png'
                }
                // GUARDAR LA INFORMACION EN JSON
                usuarios.push(usuario);
                usuariosJSON = JSON.stringify(usuarios,null,2);
                fs.writeFileSync('./data/users.json', usuariosJSON);
            }
            res.redirect("/login");
        }
    },
};

module.exports = usersControlador;