const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
//Levantando el servidor
app.listen(3030,() => console.log('Server running at port 3030'));

/*
 ** RUTAS A LOS RECURSOS **
*/

//HOME
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

//LOGIN AND REGISTER
app.get('/loginRegister', function(req,res){
    let htmlPath = path.resolve(__dirname, './views/loginRegister.html');
    res.sendFile(htmlPath);
})