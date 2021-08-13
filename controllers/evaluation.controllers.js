const { newEvaluationService } = require("../services/evaluations.services")


module.exports.newEvaluationController = async(req,res) => {

    try {
        let result = await newEvaluationService(req.body.evaluation);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json('error');
    }
};

