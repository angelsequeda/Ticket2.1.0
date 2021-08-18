//las rutas para hacer evaluaciones de los teclers, recuperarlas por los teclers y por los evaluadores autorizados

const { searchEvaluationsbyController, newEvaluationController, deleteEvaluationController } = require('../controllers/evaluation.controllers');
const { uploadNewEvaluationMiddleware, downloadEvaluationsMiddleware, didIEvaluateThisMiddleware } = require('../middlewares/security.middlewares');

const routerEvaluations = require('express').Router();

routerEvaluations.post('/new',uploadNewEvaluationMiddleware,didIEvaluateThisMiddleware,newEvaluationController);

routerEvaluations.post('/download',downloadEvaluationsMiddleware,searchEvaluationsbyController);

routerEvaluations.post('/delete',uploadNewEvaluationMiddleware,deleteEvaluationController);

routerEvaluations.post('/update',uploadNewEvaluationMiddleware,updateEvaluationController)

module.exports = {routerEvaluations};