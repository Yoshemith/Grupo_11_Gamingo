let fs = require('fs');

function recordarmeMiddleware(req, res, next){
    res.locals.isLogged = false;
    
    let archivoUsuario = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
    let usuarios;
    if (archivoUsuario == ""){
        usuarios = [];
    }else{
        usuarios = JSON.parse(archivoUsuario);
    }

    let emailInCookie = req.cookies.recordar; //checamos las cookies
    let userFromCookie = usuarios.find(oneUser => oneUser['email'] === emailInCookie); //lo buscamos en la BD

    //Si esta en la BD entonces se loguea on session
    if (userFromCookie){
        req.session.usuarioLogeado = userFromCookie;
    }
    //si esta logueado en session entonces se manda a locals
    if (req.session && req.session.usuarioLogeado){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.usuarioLogeado;
    }

    next();
}

module.exports = recordarmeMiddleware;