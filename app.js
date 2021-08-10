//Este archivo contiene el servidor de la aplicacion

const cors = require('cors');
const express = require('express');
const sequelize = require('./db/connection');
const routerTecler = require('./routes/teclers.routes');
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


//Rutas para los teclers
app.use('/teclers', routerTecler);

