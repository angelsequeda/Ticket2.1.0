const express = require('express');
const router = express.Router()
const viewsController = require('../controllers/views.controllers');


module.exports = (app) => {

  router.get('/perfiltecler', viewsController.perfilTecler)


  router.get('/', viewsController.index);

  router.get('/login', viewsController.login);

  router.get('/login/tecler',viewsController.loginTecler);
  
  router.get('/login/evaluador',viewsController.loginEvaluador);

  router.get('/login/colaborador',viewsController.loginColaborador)

  router.get('/signin', viewsController.signin)


  router.get('/signin', viewsController.signin)

  router.get('/signin/tecler', viewsController.signinTecler);

  router.get('/perfil', viewsController.inicio)

  router.get('/signin/evaluador', viewsController.signinEvaluador);

  router.get('/signin/colaborador', viewsController.signinColaborador);
  
  router.get('/perfilevaluador', viewsController.perfilEvaluador)
  app.use(router)
}