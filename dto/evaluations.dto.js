const Joi = require('joi');

//Este modelo se encarga de checar que  las evaluaciones cumplan con los datos especificos

let evaluationDTO = Joi.object({
    fromwho : Joi.string().required(),
    towho : Joi.string().required(),
    nameto : Joi.string().required(),
    namefrom : Joi.string().required(),
    knowledge : Joi.array().items(Joi.number().integer().min(0).max(5)).length(5),
    technologies : Joi.array().items(Joi.number().integer().min(0).max(5)).length(4),
    performance :Joi.array().items(Joi.number().integer().min(0).max(5)).length(3),
    soft : Joi.array().items(Joi.number().integer().min(0).max(5)).length(6),
    profesional : Joi.array().items(Joi.number().integer().min(0).max(5)).length(4)
});

module.exports = evaluationDTO;