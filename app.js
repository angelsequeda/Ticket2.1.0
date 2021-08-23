//Este archivo contiene el servidor de la aplicacion

const cors = require('cors');
const express = require('express');
const sequelize = require('./db/connection');
const { routerEvaluations } = require('./routes/evaluationsroutes');
const {routerTecler, routerCompany, routerTecla} = require('./routes/usersroutes');

require('dotenv').config();
const app = express();
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const multer = require('multer')
const routeViews = require('./routes/viewsroutes')

//Middlewares globales
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(multer({
    dest: 'public/uploads'
}).single('profilePhoto'))

//configuraciones
app.set('views', path.join(__dirname, './views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: path.join(app.get('views'), 'partials'),
  layoutsDir: path.join(app.get('views'), 'layouts'),
  extname: '.hbs',  
  //helpers: require('./server/helpers')
}))
app.set('view engine', '.hbs');

//static files

app.use('/public',express.static(path.join(__dirname, './public/')))



//Inicio de servidor

app.listen(process.env.PORT, async()=> {
    console.log('Iniciado');
    try {
        sequelize.authenticate();
        console.log('Base de datos correcta');
    } catch (error) {
        console.log('Error de conexion a base de datos[connection.js]');
    }
})


//Rutas para los usuarios
app.use('/teclers', routerTecler);
app.use('/companies',routerCompany);
app.use('/teclapartners',routerTecla);
app.use('/evaluations',routerEvaluations);
routeViews(app)