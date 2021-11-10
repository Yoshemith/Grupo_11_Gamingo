let fs = require('fs');

//AQUI REORGANIZAR PARA GAMINGO_DB
function recordarmeMiddleware(req, res, next){
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.recordar; //checamos las cookies
    let userFromCookie;
    User.findOne({ raw: true, where: { email: emailInCookie }}).then(user => {
        userFromCookie = user;
        //Si esta en la BD entonces se loguea on session
        if (userFromCookie != null || userFromCookie != undefined){
            req.session.usuarioLogeado = userFromCookie;
        }
        //si esta logueado en session entonces se manda a locals
        if (req.session && req.session.usuarioLogeado){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.usuarioLogeado;
        }
    });

    next();
}

module.exports = recordarmeMiddleware;