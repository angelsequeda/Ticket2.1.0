//Los controladores para aquellos miembros de TECLA

const { searchEvaluationByCriteria } = require("../services/evaluations.services");
const { encryptJsonToken } = require("../services/security.services");
const { addTeclaEvaluatorService,searchForTeclaEvaluatorService, updateTeclaEvaluatorService, deleteTeclaEvaluatorService } = require("../services/tecla.services");


//Buscar por un evaluador
module.exports.searchForTeclaEvaluatorController = async(req,res) => {

    try {
        
        let userFound = await searchForTeclaEvaluatorService(req.body);
        userFound.result.password = req.body.password;
        let token = encryptJsonToken(userFound.result.username,userFound.result.idEvaluator,'evaluator');
        return res.status(200).json({message:'correcto',result:userFound.result,token:token});

    } catch (error) {
        
        console.log(error);
        return res.status(400).json({message:'error'});
    }
};
//Añadir un evaluador
module.exports.addTeclaEvaluatorController = async(req,res) => {

    try {

        let newEvaluator = await addTeclaEvaluatorService(req.body);
        let evaluatorFound = await searchForTeclaEvaluatorService(req.body);
        return res.status(200).json({message:'correcto',result:evaluatorFound.result.idEvaluator});

    } catch (error) {

        console.log(error.message);
        return res.status(400).json({message:'error'});
        
    }
};
//Eliminar un evaluador
module.exports.deleteTeclaEvaluatorController = async(req,res) => {

    try {
        
        let deleteEvaluator = await deleteTeclaEvaluatorService(req.body);
        return res.status(200).json(deleteEvaluator);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json('Algo ha salido mal con la eliminación del Evaluador');
    }
};
//Actualizar la informacion de un evaluador
module.exports.updateTeclaEvaluatorController = async(req,res) => {

    try {
        
        let updatingEvaluator = await updateTeclaEvaluatorService(req.body);
        let updatedEvaluator = await searchForTeclaEvaluatorService(req.body);

        return res.status(200).json({message: updatingEvaluator.message, result:updatedEvaluator.result});

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json('Algo ha salido mal con la actualización del Evaluador');
    }
};

//Buscar la informacion de un evaluador cuando no se es el titular de la cuenta
module.exports.searchAnotherEvaluator = async(req,res) => {
    try {
        let evaluator = await searchForTeclaEvaluatorService(req.body);
        let evaluations = await searchEvaluationByCriteria({fromwho : evaluator.result.idEvaluator});
        return res.status(200).json({message : 'correcto',evaluator,evaluations});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
}