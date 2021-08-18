const { findFriendshipByCriteria } = require("../services/friendship&comments.services")

module.exports.areTheyFriendsForComment = async(req,res,next) => {

    try {
        let result =  await findFriendshipByCriteria({friend1id : req.body.id});
        let result2 = await findFriendshipByCriteria({friend2id : req.body.id});
        if(result.length + result.body.length === 0){
            return res.status(400).json({message : 'No es amigo de esta persona'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.areTheyFriendsForRequest = async(req,res,next) => {
    try {
        let result =  await findFriendshipByCriteria({friend1id : req.body.id});
        let result2 = await findFriendshipByCriteria({friend2id : req.body.id});
        if(result.length + result.body.length > 0){
            return res.status(400).json({message : 'Ya son amigos'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}