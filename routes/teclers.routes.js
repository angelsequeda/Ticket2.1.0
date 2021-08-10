//Estas son las rutas para los usuarios tipo teclers, para el Crud se usan routers permitidos por express

const { addTeclerController, searchForTeclerController } = require('../controllers/teclers.controllers');

const routerTecler = require('express').Router();


routerTecler.post('/new',addTeclerController);
routerTecler.get('/search',searchForTeclerController);

module.exports = routerTecler;