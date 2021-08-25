const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//requerir rutas
const rutas = require('./routers/main');
app.use('/', rutas);

//Puerto default o 3000
let port = process.env.PORT || 3030;

//Levantando el servidor
app.listen(port, () => console.log('Server running at port 3030'));
