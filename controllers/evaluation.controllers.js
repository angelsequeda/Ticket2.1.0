//Los controladores para crear, eliminar o buscar evaluaciones 
const { newEvaluationService, searchEvaluationByCriteria, seeAllPeople, deleteEvaluationByEvaluatorService, updateEvaluations } = require("../services/evaluations.services")


module.exports.newEvaluationController = async(req,res) => {

    try {
        let result = await newEvaluationService(req.body.evaluation);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json('error');
    }
};



module.exports.searchEvaluationsbyController = async(req,res) => {
    try {
        if(req.body.role === 'tecler') {
            let result = await searchEvaluationByCriteria({towho:req.body.idUser});
            return res.status(200).json({message:'correcto',result:result});
        }else if(req.body.role === 'evaluator') {
            let result = await searchEvaluationByCriteria({fromwho:req.body.idUser});
            return res.status(200).json({message:'correcto',result:result});
        }else {
            return res.status(409).json('Usuario no autorizado')
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json('error');
    }
};

module.exports.seeAllpeopleController = async(req,res) => {

    try {
        let result = await seeAllPeople();
        return res.status(200).json({message : 'correcto', result: result});
    } catch (error) {
        return res.status(500).json({message : 'error'});
    }
};


module.exports.deleteEvaluationController = async(req,res) => {
    try {
        await deleteEvaluationByEvaluatorService(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        return res.status(500).json({message : 'error'});
    }
};

module.exports.updateEvaluationController = async(req,res) => {
    try {
        await updateEvaluations(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        return res.status(500).json({message : 'error'});
    }
}