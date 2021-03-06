//Estos middlewrares permiten evaluar si los datos de un registro o un login son correctos

const Joi = require("joi");
const { upload } = require("../db/config/cloudinaryConfig");
const { userTeclerDTO, userEvaluatorDTO, userCompanyDTO, userDTOlogin } = require("../dto/users.dto");
const { searchForCompanyEmployeeService } = require("../services/company.services");
const { decryptPassword } = require("../services/security.services");
const { searchForTeclaEvaluatorService } = require("../services/tecla.services");
const { searchForTeclerService } = require("../services/teclers.services")
//Cuando alguien se registra, primero corroboramos que el usuario no existea (depende de si es un tecler, un evaluador o una empresa buscando talento)

//Si el usuario ya existe, no se puede volver a registrar un usuario con el mismo nombre hasta eliminar al primero
module.exports.doesUserAlreaydExist = async (req,res,next) =>{

    if (req.body.role === 'tecler') {
       
        let doesUserexist = await searchForTeclerService(req.body);
        if(doesUserexist.result != null) {
            return res.status(409).json({message:'Este Tecler ya ha sido registrado'});
        }else{
            return next();
        }

    }else if(req.body.role === 'evaluator') {
      
        let doesUserexist = await searchForTeclaEvaluatorService(req.body);
        if(doesUserexist.result != null) {
            return res.status(409).json({message:'Este Evaluador ya ha sido registrado'});
        }else {
            return next();
        }
    }else if(req.body.role === 'company') {
        
        let doesUserexist = await searchForCompanyEmployeeService(req.body);
        if(doesUserexist.result != null) {
            return res.status(409).json({messge:'Este Colaborador ya ha sido registrado'});
        }else {
            return next();
        }
    }else {
        return res.status(500).json({message:'Se ha olvidado de asignar el role'});
    }
}

//Se evaluan los datos del registro dependiendo si es un tecler, un evaluador o un colaborador de una compa??ia
module.exports.isUserForregistrationRight = (req,res,next) => {

    if(req.body.role === 'tecler') {

        try {
            Joi.assert(req.body,userTeclerDTO);
            return next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({message:'Alguno de los datos esta mal'})
        }
    }else if(req.body.role === 'evaluator'){

        try {
            Joi.assert(req.body,userEvaluatorDTO);
            return next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({message:'Alguno de los datos esta mal'})
        }

    }else if(req.body.role === 'company') {

        try {
            Joi.assert(req.body,userCompanyDTO);
            return next();
        } catch (error) {
            
            console.log(error.message);
            return res.status(400).json({message:'Alguno de los datos esta mal'});
        }
    }else{
        return res.status(400).json('eeror')
    }

};

//Evalua los datos de inicio de sesion 
module.exports.isUserForLoginRight = (req,res,next)=> {

    try {
        Joi.assert({username:req.body.username,password:req.body.password},userDTOlogin);

        return next();
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message:'Alguno de los datos es incorrecto'});
    }

};

//Si el usuario no esta registrado no puede iniciar sesion
module.exports.isUserRegistered = async(req,res,next) => {

    if (req.body.role === 'tecler') {
       
        let doesUserexist = await searchForTeclerService(req.body);
        console.log(doesUserexist);
        if(doesUserexist.result == null) {
            return res.status(409).json({message:'Usuario o contrase??a incorrectas'});
        }else{
            if(decryptPassword(req.body.password,doesUserexist.result.password)) {
                return next();
            }else {
                return res.status(400).json({message:'Usuario o contrase??a incorrectas'});
            }
        }

    }else if(req.body.role === 'evaluator') {
      
        let doesUserexist = await searchForTeclaEvaluatorService(req.body);
        if(doesUserexist.result == null) {
            return res.status(409).json({message:'Usuario o contrase??a incorrectas'});
        }else {
            if(decryptPassword(req.body.password,doesUserexist.result.password)) {
                return next();
            }else {
                return res.status(400).json({message:'Usuario o contrase??a incorrectas'});
            }
        }
    }else if(req.body.role === 'company') {
        
        let doesUserexist = await searchForCompanyEmployeeService(req.body);
        if(doesUserexist.result == null) {
            return res.status(400).json({message:'Usuario o contrase??a incorrectas'});
        }else {
            if(decryptPassword(req.body.password,doesUserexist.result.password)) {
                return next();
            }else {
                return res.status(400).json({message:'Usuario o contrase??a incorrectas'});
            }
        }
    }else {
        return res.status(500).json({message:'Usuario o contrase??a incorrectas'});
    }
};
