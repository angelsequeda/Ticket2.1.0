const { newEvaluationService, searchEvaluationsByTeclerService, searchEvaluationsByEvaluatorService } = require("../services/evaluations.services")


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
    console.log(req.body);
    try {
        if(req.role === 'tecler') {
            let result = await searchEvaluationsByTeclerService(req.idUser);
            return res.status(200).json({message:'correcto',result:result});
        }else if(req.role === 'evaluator') {
            let result = await searchEvaluationsByEvaluatorService(req.idUser);
            return res.status(200).json({message:'correcto',result:result});
        }else {
            return res.status(409).json('Usuario no autorizado')
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json('error');
    }
}