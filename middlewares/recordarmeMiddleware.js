const db = require('../database/models');
const sequelize = db.sequelize;
//Llamar a los modelos
const User = db.User;

async function recordarmeMiddleware(req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.recordar; //checamos las cookies
    if(emailInCookie != null || emailInCookie != undefined){
        //pedido asincronico a la db y seteo con promesa
        await User.findOne({ raw: true, where: { email: emailInCookie }}).then(user => {
            //Si esta en la BD entonces se loguea on session
            if (user != null || user != undefined){
                req.session.usuarioLogeado = user;
                //res.locals.isLogged = true;
                //res.locals.userLogged = req.session.usuarioLogeado;
            }
        }).catch(err => {
            console.log(err);
       });
    }
    //si esta logueado en session entonces se manda a locals
    if (req.session && req.session.usuarioLogeado){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.usuarioLogeado;
    } 
    next();
}

module.exports = recordarmeMiddleware;