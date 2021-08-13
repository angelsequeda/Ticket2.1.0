//Estas son todas las rutas para todos los tipos de usuarios que existen

const { addCompanyEmployeeController,updateCompanyEmployeeController, deleteCompanyEmployeeController, searchForCompanyEmployeeController } = require('../controllers/company.controller');
const { searchForTeclaEvaluatorController, addTeclaEvaluatorController, updateTeclaEvaluatorController, deleteTeclaEvaluatorController } = require('../controllers/tecla.controllers');
const { addTeclerController, searchForTeclerController, updateTeclerController, deleteTeclerController } = require('../controllers/teclers.controllers');
const { doesUserAlreaydExist, isUserForregistrationRight, isUserForLoginRight, isUserRegistered } = require('../middlewares/register.middleware');
const updateMiddleware = require('../middlewares/security.middlewares');


const routerTecler = require('express').Router();
const routerCompany = require('express').Router();
const routerTecla = require('express').Router();

//Routers para los teclers

routerTecler.post('/new',isUserForregistrationRight,doesUserAlreaydExist,addTeclerController);
routerTecler.post('/search',isUserForLoginRight,isUserRegistered,searchForTeclerController);
routerTecler.put('/actualize',updateMiddleware,updateTeclerController);
routerTecler.delete('/delete',deleteTeclerController);

//Routers para los usuarios de compañias

routerCompany.post('/new',isUserForregistrationRight,doesUserAlreaydExist,addCompanyEmployeeController);
routerCompany.post('/search',isUserForLoginRight,isUserRegistered,searchForCompanyEmployeeController);
routerCompany.put('/actualize',updateCompanyEmployeeController);
routerCompany.delete('/delete',deleteCompanyEmployeeController);

//Routers para los usuarios miembros de TECLA

routerTecla.post('/new',isUserForregistrationRight,doesUserAlreaydExist,addTeclaEvaluatorController);
routerTecla.post('/search',isUserForLoginRight,isUserRegistered,searchForTeclaEvaluatorController);
routerTecla.put('/actualize',updateTeclaEvaluatorController);
routerTecla.delete('/delete',deleteTeclaEvaluatorController);

module.exports = {routerTecler,routerCompany,routerTecla};