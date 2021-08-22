const joi = require('joi');

const commentDTO = joi.object({
    id1 : joi.string().required(),
    id2 : joi.string().required(),
    name1 : joi.string().required(),
    name2 : joi.string().required(),
    commentary : joi.string().max(2000),
    token : joi.string().required()
});

module.exports = commentDTO;