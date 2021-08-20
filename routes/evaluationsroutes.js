//las rutas para hacer evaluaciones de los teclers, recuperarlas por los teclers y por los evaluadores autorizados

const { searchEvaluationsbyController, newEvaluationController, deleteEvaluationController, updateEvaluationController } = require('../controllers/evaluation.controllers');
const { uploadNewEvaluationMiddleware, downloadEvaluationsMiddleware, didIEvaluateThisMiddleware, doesEvaluatedExistMiddleware } = require('../middlewares/security.middlewares');

const routerEvaluations = require('express').Router();

routerEvaluations.post('/new',uploadNewEvaluationMiddleware,doesEvaluatedExistMiddleware,didIEvaluateThisMiddleware,newEvaluationController);

routerEvaluations.post('/download',downloadEvaluationsMiddleware,searchEvaluationsbyController);

routerEvaluations.post('/delete',uploadNewEvaluationMiddleware,deleteEvaluationController);

routerEvaluations.post('/update',uploadNewEvaluationMiddleware,updateEvaluationController)

module.exports = {routerEvaluations}
