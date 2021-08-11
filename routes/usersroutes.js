//Estas son todas las rutas para todos los tipos de usuarios que existen

const { addCompanyEmployeeController,updateCompanyEmployeeController, deleteCompanyEmployeeController, searchForCompanyEmployeeController } = require('../controllers/company.controller');
const { searchForTeclaEvaluatorController, addTeclaEvaluatorController, updateTeclaEvaluatorController, deleteTeclaEvaluatorController } = require('../controllers/tecla.controllers');
const { addTeclerController, searchForTeclerController, updateTeclerController, deleteTeclerController } = require('../controllers/teclers.controllers');
const { deleteTeclaEvaluatorService } = require('../services/tecla.services');

const routerTecler = require('express').Router();
const routerCompany = require('express').Router();
const routerTecla = require('express').Router();

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

//Routers para los usuarios miembros de TECLA

routerTecla.post('/new',addTeclaEvaluatorController);
routerTecla.get('/search',searchForTeclaEvaluatorController);
routerTecla.put('/actualize',updateTeclaEvaluatorController);
routerTecla.delete('/delete',deleteTeclaEvaluatorController);

module.exports = {routerTecler,routerCompany,routerTecla};