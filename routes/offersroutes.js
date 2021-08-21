//Las rutas para las ofertas de trabajo

const { newOferController, deleteOferController, answerOferController } = require('../controllers/offers.controller');

let oferRouter = require('express').Router();


oferRouter.post('/new',newOferController);
oferRouter.post('/delete',deleteOferController);
oferRouter.post('/answer',answerOferController);

module.exports = oferRouter;