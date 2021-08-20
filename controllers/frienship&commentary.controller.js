const { newFriendshipRequestService, deleteFriendshipService, createNewCommentService, acceptFriendshipService } = require("../services/friendship&comments.services")

module.exports.newFriendshipRequestController = async(req,res) => {
    try {
        await newFriendshipRequestService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message : 'error'});
    }
};




module.exports.changeFrienshipState = async(req,res) => {
    try {
        if(req.body.what === "delete"){
            await deleteFriendshipService(req.body);
        }else if(req.body.what === "accept"){
            await acceptFriendshipService(req.body);
        };
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}

module.exports.newCommentController = async (req,res) => {
    try {
        await createNewCommentService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
}

