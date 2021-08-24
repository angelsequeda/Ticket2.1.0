//Middlewares de seguridad y que evitan confusiones con las bases de datos

const Joi = require("joi");
const evaluationDTO = require("../dto/evaluations.dto");
const { searchEvaluationsByEvaluatorService, searchEvaluationByCriteria } = require("../services/evaluations.services");
const { decryptJsonToken } = require("../services/security.services");
const { searchForTeclerService } = require("../services/teclers.services");
//No se puede actualizar la informacion de un usuario si no se es el propio usuario 
module.exports.updateMiddleware = (req,res,next) => {
    let tokenReceived = decryptJsonToken(req.body.token);
    if(tokenReceived.role === 'tecler') {
        if(tokenReceived.iduser === req.body.data.idTecler){
            return next();
        }else {
            return res.status(400).json({message : 'Usuario no autorizado'});
        }
    }else if(tokenReceived.role === 'company') {
        if(tokenReceived.iduser === req.body.data.idCompanyUser){
            return next();
        }else{
            return res.status(400).json({message : 'Usuario no autorizado'});
        }
    }else if(tokenReceived.role === 'evaluator'){
        if(tokenReceived.iduser === req.body.data.idCompanyUser){
            return next();
        }else{
            return res.status(400).json({message : 'Usuario no autorizado'});
        }
    }else {
        return res.status(400).json({message : 'Usuario no autorizado'});
    }
};
//No se permiten evaluaciones por personas que no son evaluadores
module.exports.uploadNewEvaluationMiddleware = async (req,res,next) => {
        try {
            let tokenReceived = decryptJsonToken(req.body.token);
            if (tokenReceived.role !== 'evaluator') {
                return res.status(409).json({message : 'Usuario no uatorizado'});
            }else {
                next();
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message : 'error'})
        }
};
//No se permite evaluar dos veces a un mismo tecler por un mismo evaluador
module.exports.didIEvaluateThisMiddleware = async(req,res,next) => {
    try {
        let evaluationFound = await searchEvaluationByCriteria({towho:req.body.evaluation.towho,fromwho:req.body.evaluation.fromwho});
        if(req.body.evaluation.knowledge && evaluationFound.knowledges.length > 0){
            return res.status(400).json({message : 'Ya se ha realizado una evaluacion de conocimientos'});
        }else if(req.body.evaluation.technologies && evaluationFound.technologies.length > 0){
            return res.status(400).json({message : 'Ya se ha realizado una evaluacion de tecnologias'});
        }else if(req.body.evaluation.performance && evaluationFound.performance.length > 0){
            return res.status(400).json({message : 'Ya se ha realizado una evaluacion de desempeño'});
        }else if(req.body.evaluation.soft && evaluationFound.softskills.length > 0){
            return res.status(400).json({message : 'Ya se ha realizado una evaluacion de habilidades blandas'});
        }else if(req.body.evaluation.profesional && evaluationFound.profesional.length > 0){
            return res.status(400).json({message : 'Ya se ha realizado una evaluacion de entorno profesional'});
        }else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}

//Si no se es un evaluador o un tecler, no se pueden descargar las evaluaciones de nadie de manera directa si no se es un evaluador o el tecler
module.exports.downloadEvaluationsMiddleware = (req,res,next) => {

    try {
        let tokenReceived = decryptJsonToken(req.body.token); 
        console.log(tokenReceived);
        if(req.body.idSearch && tokenReceived.role !== 'tecler'){
            req.body.idUser = req.body.idSearch;
            req.body.role = 'tecler';
            next();
        }else {
            if(tokenReceived.role === 'tecler') {
                req.body.idUser = tokenReceived.iduser;
                req.body.role = 'tecler';
                next();
            }else if(tokenReceived.role === 'evaluator'){
                req.body.idUser = tokenReceived.iduser;
                req.body.role = 'evaluator';
                next();
            }else {
                return res.status(409).json({message : 'Usuario no autorizado'});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'error'});
    }
};

//Se pueden eliminar usuarios si no se es el propio usuario
module.exports.deleteMiddleware = (req,res,next) => {
    try {
        let tokenReceived = decryptJsonToken(req.body.token);
        console.log(tokenReceived);
        console.log(req.body);
        if(tokenReceived.role === 'tecler'){
            if(tokenReceived.iduser === req.body.idTecler){
                next();
            }else {
                return res.status(409).json({message : 'Usuario no autorizado'});
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.status(409).json({message : 'Usuario no autorizado'});
    }
};
//Se necesita comprobar el token para saber si se puede consultar a los ususarios
module.exports.getAllDataMiddleware = async(req,res,next) => {

    try {
        let tokenReceived = decryptJsonToken(req.headers.autorization);
        next()
    } catch (error) {
        console.log(error);
        return res.status(409).json({message : 'Usuario no autorizado'});
    }
};
//Si el usuario a evaluar no existe no se permite la evaluacion
module.exports.doesEvaluatedExistMiddleware = async(req,res,next) => {
    console.log(req.body);

    let result = await searchForTeclerService({username : req.body.evaluation.nameto});
    console.log(result);
    if(result.result) {
        next();
    }else {
        return res.status(400).json('Este tecler no existe');
    }
};


module.exports.compareEvaluation = async(req,res,next) => {
    try {
        Joi.attempt(req.body.evaluation,evaluationDTO);
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
}