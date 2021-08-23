const joi = require('joi');

const offerDTO = joi.object({
    namefrom : joi.string().alphanum().required(),
    nameto : joi.string().alphanum().required(),
    fromwho : joi.string().alphanum().required(),
    towho : joi.string().alphanum().required(),
    job : joi.string().max(200).required(),
    salary : joi.number().min(0).required(),
    ofer : joi.string().max(2000).required(),
    token : joi.string().required()
});

const responseDTO = joi.object({
    id : joi.number().integer().required(),
    fromwho : joi.string().alphanum().required(),
    towho : joi.string().alphanum().required(),
    answer : joi.string().max(1000).required(),
    token : joi.string().required()
})
module.exports = {offerDTO,responseDTO};