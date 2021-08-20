const { findFriendshipByCriteria } = require("../services/friendship&comments.services");
const { decryptJsonToken } = require("../services/security.services");

module.exports.areTheyFriendsForComment = async(req,res,next) => {

    try {
        let tokenreceived = decryptJsonToken(req.body.token);
        if(tokenreceived.role !== "evaluator"){
            let result =  await findFriendshipByCriteria({friend1id : req.body.id1,friend2id: req.body.id2,accepted:1});
            let result2 = await findFriendshipByCriteria({friend2id : req.body.id1, friend1id: req.body.id2,accepted:1});

            if(result.length + result2.length === 0){
            return res.status(400).json({message : 'No es amigo de esta persona'});
            }else {
                next();
            }
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
        let result =  await findFriendshipByCriteria({friend1id : req.body.id1,friend2id: req.body.id2});
        let result2 = await findFriendshipByCriteria({friend2id : req.body.id1,friend1id: req.body.id2});
        if(result.length + result2.length > 0){
            return res.status(400).json({message : 'Ya son amigos'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.canYouMakeAcomment = async(req,res,next) => {
    try {
        let tokenreceived = decryptJsonToken(req.body.token);
        if(tokenreceived.role !== "tecler" && tokenreceived.role !== "evaluator") {
            return res.status(409).json({message : 'Usted no puede hacer un comentario'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'})
    }
};

module.exports.youCantbeYourOwnfriend = async(req,res,next) => {
    try {
        if(req.body.id1 === req.body.id2){
            return res.status(409).json({message : 'No puedes ser tu propio amigo'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.itsMeForfriendship = async(req,res,next) => {
    try {
        let tokenreceived = decryptJsonToken(req.body.token);
        if(tokenreceived.iduser !== req.body.id1 && tokenreceived.iduser !== req.body.id2){
            return res.status(409).json({messsage:'Esta no es tu cuenta'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.itsMeForComment = async(req,res,next)=> {
    try {
        let tokenreceived = decryptJsonToken(req.body.token);
        if(tokenreceived.iduser !== req.body.id1){
            return res.status(409).json({message : 'Esta no es tu cuenta'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}