const { newFriendshipRequestService, deleteFriendshipService, createNewCommentService, acceptFriendshipService, findFriendshipByCriteria, getAllmyCommentsService, deleteCommentService } = require("../services/friendship&comments.services")


//Generar una solicitud de amistad
module.exports.newFriendshipRequestController = async(req,res) => {
    try {
        await newFriendshipRequestService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message : 'error'});
    }
};



//Actualizar la solicitud de amistad (aceptarla o borrarla)
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
//Crear nuevo comentario
module.exports.newCommentController = async (req,res) => {

    try {
        await createNewCommentService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
}
//Encontrar todos los amigos de un tecler
module.exports.findAllmyFriendsController = async(req,res) => {
    try {
        let result1 = await findFriendshipByCriteria({friend1id : req.body.id1});
        let result2 = await findFriendshipByCriteria({friend2id : req.body.id1});

        return res.status(200).json({message : 'correcto',result : result1.concat(result2)});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.findAllmyCommentsController = async(req,res) => {
    try {
        let result = await getAllmyCommentsService(req.body);
        return res.status(200).json({ message : 'correcto', result : result});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.deleteCommentController = async(req,res) => {
    try {
        await deleteCommentService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message  : 'error'});
    }
}