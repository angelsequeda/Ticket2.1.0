const { newCommentController, changeFrienshipState, newFriendshipRequestController } = require('../controllers/frienship&commentary.controller');
const { areTheyFriendsForComment, areTheyFriendsForRequest } = require('../middlewares/friendship&comments.middlewares');

let friendshipRouter = require('express').Router();

friendshipRouter.post('/newcomment',areTheyFriendsForComment,newCommentController);
friendshipRouter.post('/newfriendship',areTheyFriendsForRequest,newFriendshipRequestController);
friendshipRouter.post('/changefrienship',changeFrienshipState);


module.exports = friendshipRouter;