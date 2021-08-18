const { newFriendshipRequestService, deleteFriendshipService, createNewCommentService } = require("../services/friendship&comments.services")

module.exports.newFriendshipRequestController = async(req,res) => {
    try {
        await newFriendshipRequestService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message : 'error'});
    }
};


module.exports.deleteFriendshipController = async (req,res) => {
    try {
        await deleteFriendshipService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
};

module.exports.newCommentController = async (req,res) => {
    try {
        await createNewCommentService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
}

