let fs = require('fs');

function recordarmeMiddleware(req, res, next){
    next();
    if(req.cookies.recordar != undefined && req.session.usuarioLogeado == undefined){
        let archivoUsuario = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
            let usuarios;
            if (archivoUsuario == ""){
                usuarios = [];
            }else{
                usuarios = JSON.parse(archivoUsuario);
            }

            for(let i=0; i < usuarios.length; i++){
                if (usuarios[i].email == req.cookies.recordar){
                    var usuarioLogeado = usuarios[i];
                    break;
                }
            }

            req.session.usuarioLogeado = usuarioLogeado;
    }
}

module.exports = recordarmeMiddleware;