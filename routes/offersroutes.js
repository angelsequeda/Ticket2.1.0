//Las rutas para las ofertas de trabajo

const { newOferController, deleteOferController, answerOferController, deleteAnswerController, getAllOffersController } = require('../controllers/offers.controller');
const { whatRoleOfferisYours, canYouMakeAnOffer, canYoudeleteThisOfer } = require('../middlewares/offers.middlewares');

let oferRouter = require('express').Router();


oferRouter.post('/new',canYouMakeAnOffer,newOferController);
oferRouter.post('/delete',canYouMakeAnOffer,canYoudeleteThisOfer,deleteOferController);
oferRouter.post('/answer',answerOferController);
oferRouter.post('/deleteanswer',deleteAnswerController);
oferRouter.post('/getoffers',whatRoleOfferisYours,getAllOffersController);

module.exports = oferRouter;