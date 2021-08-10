const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

/*
 ** RUTAS A LOS RECURSOS **
*/

//HOME
/* app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
}); */

//Levantando el servidor
app.listen(3030,() => console.log('Server running at port 3030'));