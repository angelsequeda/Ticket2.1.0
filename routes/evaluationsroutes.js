//las rutas para hacer evaluaciones de los teclers, recuperarlas por los teclers y por los evaluadores autorizados

const { searchEvaluationsbyController, newEvaluationController } = require('../controllers/evaluation.controllers');
const { uploadNewEvaluationMiddleware, downloadEvaluationsMiddleware } = require('../middlewares/security.middlewares');

const routerEvaluations = require('express').Router();

routerEvaluations.post('/new',uploadNewEvaluationMiddleware,newEvaluationController);

routerEvaluations.post('/download',downloadEvaluationsMiddleware,searchEvaluationsbyController);

module.exports = {routerEvaluations};