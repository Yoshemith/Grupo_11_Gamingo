// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar usar los métodos PUT y DELETE 

// ************ express()
const app = express();

// SESSION
const session = require('express-session');
app.use(session({secret: 'Secreto!', resave:false, saveUninitialized:false,}));

// COOKIE
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// ************ Middlewares ************
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));

var recordarmeMiddleware = require('./middlewares/recordarmeMiddleware');
app.use(recordarmeMiddleware);

//requerir rutas
const rutasMain = require('./routers/main');
app.use('/', rutasMain);

const rutasUsers = require('./routers/users');
app.use(rutasUsers);

const rutasProducts = require('./routers/products');
app.use('/products', rutasProducts);

//Aquí llamo a la ruta de las api de Category
const apiCategoriesRouter = require('./routers/api/categories')
//Aquí llamo a la ruta de las api de actors
const apiProductsRouter = require('./routers/api/products')
//Aquí llamo a la ruta de las api de actors
const apiUsersRouter = require('./routers/api/users')
//Aquí creo la colección de mis recursos de Gamingo (APIs)
app.use('/api/categories',apiCategoriesRouter);
app.use('/api/products',apiProductsRouter);
app.use('/api/users',apiUsersRouter);

//Confifiguracion EJS como template engine & Puerto default o 3000
app.set('view engine', 'ejs');
let port = 3001;//process.env.PORT || 3001;

app.listen(port, () => console.log('Server running at port 3001')); //Levantando el servidor

app.use((req, res, next) => {
    res.status(404).render('./main/not-found');
})