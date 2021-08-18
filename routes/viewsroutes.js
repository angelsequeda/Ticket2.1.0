const express = require('express');
const router = express.Router()
const viewsController = require('../controllers/views.controllers');


module.exports = (app) => {
  router.get('/', viewsController.index);

  router.get('/login', viewsController.login);

  router.get('/login/tecler',viewsController.loginTecler);
  router.post('/login/tecler/validation',viewsController.loginTeclerValidation)

  router.get('/login/evaluador',viewsController.loginEvaluador);

  router.get('/login/colaborador',viewsController.loginColaborador)
  router.get('/signin', viewsController.signin)
  app.use(router)
}