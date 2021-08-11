//Estas son todas las rutas para todos los tipos de usuarios que existen

const { addCompanyEmployeeController,updateCompanyEmployeeController, deleteCompanyEmployeeController, searchForCompanyEmployeeController } = require('../controllers/company.controller');
const { searchForTeclaEvaluatorController, addTeclaEvaluatorController, updateTeclaEvaluatorController, deleteTeclaEvaluatorController } = require('../controllers/tecla.controllers');
const { addTeclerController, searchForTeclerController, updateTeclerController, deleteTeclerController } = require('../controllers/teclers.controllers');
const { doesUserAlreaydExist, isUserForregistrationRight, isUserForLoginRight, isUserRegistered } = require('../middlewares/register.middleware');


const routerTecler = require('express').Router();
const routerCompany = require('express').Router();
const routerTecla = require('express').Router();

//Routers para los teclers

routerTecler.post('/new',isUserForregistrationRight,doesUserAlreaydExist,addTeclerController);
routerTecler.get('/search',isUserForLoginRight,isUserRegistered,searchForTeclerController);
routerTecler.put('/actualize',updateTeclerController);
routerTecler.delete('/delete',deleteTeclerController);

//Routers para los usuarios de compañias

routerCompany.post('/new',isUserForregistrationRight,doesUserAlreaydExist,addCompanyEmployeeController);
routerCompany.get('/search',isUserForLoginRight,isUserRegistered,searchForCompanyEmployeeController);
routerCompany.put('/actualize',updateCompanyEmployeeController);
routerCompany.delete('/delete',deleteCompanyEmployeeController);

//Routers para los usuarios miembros de TECLA

routerTecla.post('/new',isUserForregistrationRight,doesUserAlreaydExist,addTeclaEvaluatorController);
routerTecla.get('/search',isUserForLoginRight,isUserRegistered,searchForTeclaEvaluatorController);
routerTecla.put('/actualize',updateTeclaEvaluatorController);
routerTecla.delete('/delete',deleteTeclaEvaluatorController);

module.exports = {routerTecler,routerCompany,routerTecla};