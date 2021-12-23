function adminMiddleware(req, res, next){
    if (!req.session.usuarioLogeado){
        return res.redirect('/login');
    } else if(req.session.usuarioLogeado.id_typeUser == 3){
        return res.redirect('/profile');
    }
    next();
}

module.exports = adminMiddleware;