const { newEvaluationService, searchEvaluationsByEvaluatorService, searchEvaluationByCriteria } = require("../services/evaluations.services")


module.exports.newEvaluationController = async(req,res) => {

    try {
        let result = await newEvaluationService(req.body.evaluation);
        return res.status(200).json(result);
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
}