const Joi = require("joi");
const { userTeclerDTO, userEvaluatorDTO, userCompanyDTO } = require("../dto/users.dto");
const { searchForCompanyEmployeeService } = require("../services/company.services");
const { searchForTeclaEvaluatorService } = require("../services/tecla.services");
const { searchForTeclerService } = require("../services/teclers.services")

//Cuando alguien se registra, primero corroboramos que el usuario no existea (depende de si es un tecler, un evaluador o una empresa buscando talento)


module.exports.doesUserAlreaydExist = async(req,res,next) =>{
    console.log(req.body.role);
    if (req.body.role === 'tecler') {
       
        let doesUserexist = await searchForTeclerService(req.body);
        if(doesUserexist.result != null) {
            return res.status(409).json('Este Tecler ya ha sido registrado');
        }else{
            return next();
        }

    }else if(req.body.role === 'evaluator') {
      
        let doesUserexist = await searchForTeclaEvaluatorService(req.body);
        if(doesUserexist.result != null) {
            return res.status(409).json('Este Evaluador ya ha sido registrado');
        }else {
            return next();
        }
    }else if(req.body.role === 'company') {
        
        let doesUserexist = await searchForCompanyEmployeeService(req.body);
        if(doesUserexist.result != null) {
            return res.status(409).json('Este Solicitante ya ha sido registrado');
        }else {
            return next();
        }
    }else {
        return res.status(500).json('Se ha olvidado de asignar el role');
    }
}


module.exports.isUserForregistrationRight = (req,res,next) => {

    console.log(req.body);
    if(req.body.role === 'tecler') {

        try {
            Joi.assert(req.body,userTeclerDTO);
            return next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({message:'Alguno de los datos esta mal'})
        }
    } 
    if(req.body.role === 'evaluator'){

        try {
            Joi.assert(req.body,userEvaluatorDTO);
            return next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({message:'Alguno de los datos esta mal'})
        }

    }
    if(req.body.role === 'company') {

        try {
            Joi.assert(req.body,userCompanyDTO);
            return next();
        } catch (error) {
            
            console.log(error.message);
            return res.status(400).json({message:'Alguno de los datos esta mal'});
        }
    }

}