//Los controladores para las ofertas de trabajo

const { createNewOfer, deleteOfer, updateOferAnswer, deleteResponse, findOfersByCriteriaService, findAnswersByCriteriaService } = require("../services/offers.services")

module.exports.newOferController = async(req,res) => {
    try {
        await createNewOfer(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.deleteOferController = async(req,res) => {
    try {
        await deleteOfer(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.answerOferController = async(req,res) => {
    try {
        await updateOferAnswer(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.deleteAnswerController = async(req,res) => {
    try {
        await deleteResponse(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.getAllOffersController = async(req,res)=> {
    try {
        if(req.body.role === "tecler"){
            let result = await findOfersByCriteriaService({towho : req.body.id});
            return res.status(200).json({message : 'correcto', result : result});
        }else if(req.body.role === "company"){
            let result = await findOfersByCriteriaService({namefrom : req.body.id});
            let answers = await findAnswersByCriteriaService({oferedBy : req.body.id});
            return res.status(200).json({message : 'correcto', result : result, answers : answers});
        };
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};