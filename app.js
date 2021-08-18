//Este archivo contiene el servidor de la aplicacion

const cors = require('cors');
const express = require('express');
const { seeAllpeopleController } = require('./controllers/evaluation.controllers');
const sequelize = require('./db/connection');
const { getAllDataMiddleware } = require('./middlewares/security.middlewares');
const { routerEvaluations } = require('./routes/evaluationsroutes');
const friendshipRouter = require('./routes/friendship&coments.routes');
const {routerTecler, routerCompany, routerTecla} = require('./routes/usersroutes');
require('dotenv').config();
const app = express();


//Middlewares globales
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

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
app.get('/mainIndex',getAllDataMiddleware,seeAllpeopleController);
app.use('/friendscomments',friendshipRouter);