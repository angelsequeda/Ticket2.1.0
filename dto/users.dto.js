const Joi = require('joi');


//Este modelo se encarga de corroborar que los datos del registro de un Tecler son correctos

let userTeclerDTO =  Joi.object({
    profilePhoto : Joi.string(),
    tellUsSomething: Joi.string().pattern(new RegExp("^(.*)")),
    name: Joi.string().required(),
    city: Joi.string().alphanum().required(),
    country: Joi.string().alphanum().required(),
    age: Joi.number().integer().required(),
    lenguages: Joi.string(),
    education: Joi.string(),
    social: Joi.string(),
    hobbies: Joi.string(),
    username: Joi.string().alphanum().min(5).max(30).required(),
    mail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,1000}$")).min(5).max(10).required(),
    role: Joi.string(),
});



//Estee modelo revisa el registro de un usuario de tipo evaluador de Tecla

let userEvaluatorDTO = Joi.object({
    profilePhoto : Joi.string(),
    tellUsSomething: Joi.string().pattern(new RegExp("^(.*)")),
    name: Joi.string().required(),
    username: Joi.string().alphanum().min(5).max(30).required(),
    job: Joi.string().required(),
    mail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,1000}$")).min(5).max(10).required(),
    role: Joi.string(),
});

//Este modelo revisa el registro de un usuario tipo compañia

let userCompanyDTO = Joi.object({
    profilePhoto : Joi.string(),
    name: Joi.string().required(),
    companyName : Joi.string().pattern(new RegExp('^[a-zA-Z_ ]*$')).required(),
    username: Joi.string().alphanum().min(5).max(30).required(),
    job: Joi.string().required(),
    mail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,1000}$")).min(5).max(10).required(),
    role: Joi.string(),
})

//Este modelo revisa si al hacer login se toman en cuenta las reglas

let userDTOlogin = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,1000}$")).min(5).max(10).required()
});

module.exports = {userTeclerDTO,userEvaluatorDTO,userCompanyDTO,userDTOlogin};