//Estas son todas las rutas para todos los tipos de usuarios que existen

const { addCompanyEmployeeController,updateCompanyEmployeeController, deleteCompanyEmployeeController, searchForCompanyEmployeeController } = require('../controllers/company.controller');
const { addTeclerController, searchForTeclerController, updateTeclerController, deleteTeclerController } = require('../controllers/teclers.controllers');

const routerTecler = require('express').Router();
const routerCompany = require('express').Router();

//Routers para los teclers
routerTecler.post('/new',addTeclerController);
routerTecler.get('/search',searchForTeclerController);
routerTecler.put('/actualize',updateTeclerController);
routerTecler.delete('/delete',deleteTeclerController);

//Routers para los usuarios de compañias


routerCompany.post('/new',addCompanyEmployeeController);
routerCompany.get('/search',searchForCompanyEmployeeController);
routerCompany.put('/actualize',updateCompanyEmployeeController);
routerCompany.delete('/delete',deleteCompanyEmployeeController);
module.exports = {routerTecler,routerCompany};