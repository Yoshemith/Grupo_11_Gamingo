// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar usar los métodos PUT y DELETE 

// ************ express()
const app = express();

// ************ Middlewares ************
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//requerir rutas
const rutasMain = require('./routers/main');
app.use(rutasMain);

const rutasUsers = require('./routers/users');
app.use(rutasUsers);

const rutasProducts = require('./routers/products');
app.use(rutasProducts);

//Confifiguracion EJS como template engine
app.set('view engine', 'ejs');

//Puerto default o 3000
let port = process.env.PORT || 3000;

//Levantando el servidor
app.listen(port, () => console.log('Server running at port 3000'));

