//Rutas para hacer comentarios y solicitudes de amistad
const { newCommentController, changeFrienshipState, newFriendshipRequestController, findAllmyFriendsController } = require('../controllers/frienship&commentary.controller');
const { areTheyFriendsForComment, areTheyFriendsForRequest, canYouMakeAcomment, itsMeForfriendship } = require('../middlewares/friendship&comments.middlewares');

let friendshipRouter = require('express').Router();

friendshipRouter.post('/newcomment',canYouMakeAcomment,itsMeForfriendship,areTheyFriendsForComment,newCommentController);
friendshipRouter.post('/newfriendship',itsMeForfriendship,areTheyFriendsForRequest,newFriendshipRequestController);
friendshipRouter.post('/changefrienship',itsMeForfriendship,changeFrienshipState);
friendshipRouter.post('/getmyfriends',itsMeForfriendship,findAllmyFriendsController);

module.exports = friendshipRouter;