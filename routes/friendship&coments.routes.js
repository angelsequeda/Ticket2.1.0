//Rutas para hacer comentarios y solicitudes de amistad
const { newCommentController, changeFrienshipState, newFriendshipRequestController, findAllmyFriendsController, findAllmyCommentsController, deleteCommentController } = require('../controllers/frienship&commentary.controller');
const { areTheyFriendsForComment, areTheyFriendsForRequest, canYouMakeAcomment, itsMeForfriendship, itsMeForComment, youCantAcceptYourOwnRequest, youCantbeYourOwnfriend } = require('../middlewares/friendship&comments.middlewares');

let friendshipRouter = require('express').Router();

friendshipRouter.post('/newcomment',canYouMakeAcomment,youCantbeYourOwnfriend,itsMeForComment,areTheyFriendsForComment,newCommentController);
friendshipRouter.post('/newfriendship',itsMeForfriendship,youCantbeYourOwnfriend,areTheyFriendsForRequest,newFriendshipRequestController);
friendshipRouter.post('/changefrienship',itsMeForfriendship,youCantAcceptYourOwnRequest,changeFrienshipState);
friendshipRouter.post('/getmyfriends',itsMeForfriendship,findAllmyFriendsController);
friendshipRouter.post('/getmycomments',itsMeForComment,findAllmyCommentsController);
friendshipRouter.post('/deletecomment',itsMeForfriendship,deleteCommentController);

module.exports = friendshipRouter;