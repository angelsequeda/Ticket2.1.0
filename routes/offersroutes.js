//Las rutas para las ofertas de trabajo

const { newOferController, deleteOferController } = require('../controllers/offers.controller');

let oferRouter = require('express').Router();


oferRouter.post('/new',newOferController);
oferRouter.post('delete',deleteOferController);

module.exports = oferRouter;