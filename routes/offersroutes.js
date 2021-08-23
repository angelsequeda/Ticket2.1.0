//Las rutas para las ofertas de trabajo

const { newOferController, deleteOferController, answerOferController, deleteAnswerController, getAllOffersController } = require('../controllers/offers.controller');
const { whatRoleOfferisYours, canYouMakeAnOffer, canYoudeleteThisOfer, compareOffer, compareAnswer } = require('../middlewares/offers.middlewares');

let oferRouter = require('express').Router();


oferRouter.post('/new',canYouMakeAnOffer,compareOffer,newOferController);
oferRouter.post('/delete',canYouMakeAnOffer,canYoudeleteThisOfer,deleteOferController);
oferRouter.post('/answer',compareAnswer,answerOferController);
oferRouter.post('/deleteanswer',deleteAnswerController);
oferRouter.post('/getoffers',whatRoleOfferisYours,getAllOffersController);

module.exports = oferRouter;