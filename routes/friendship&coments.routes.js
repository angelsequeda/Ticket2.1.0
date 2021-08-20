const { newCommentController, changeFrienshipState } = require('../controllers/frienship&commentary.controller');
const { areTheyFriendsForComment, areTheyFriendsForRequest } = require('../middlewares/friendship&comments.middlewares');
const { newFriendshipRequestService } = require('../services/friendship&comments.services');

let friendshipRouter = require('express').Router();

friendshipRouter.post('/newcomment',areTheyFriendsForComment,newCommentController);
friendshipRouter.post('/newfriendship',areTheyFriendsForRequest,newFriendshipRequestService);
friendshipRouter.post('/change',areTheyFriendsForComment,changeFrienshipState);


module.exports = friendshipRouter;