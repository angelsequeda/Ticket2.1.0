const employmentOferModel = require("../models/employmentofer.model");
const responseToOferModel = require("../models/responsetoofer.model");

module.exports.createNewOfer = async(data) => {
    let today = new Date();
    console.log(today.toDateString());
    try {
        await employmentOferModel.create({
            fromwho : data.fromwho,
            towho : data.towho,
            job : data.job,
            salary : data.salary,
            ofer :  data.ofer
        });
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al crear oferta [offers.services.js]');
    }
};


module.exports.deleteOfer = async(data) => {
    try {
        await employmentOferModel.destroy({where : {fromwho : data.fromwho , towho : data.towho, id: data.id}});
        await responseToOferModel.destroy({where : {idOfOfer : data.id}});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al eliminar oferta [offers.services.js]');
    }
};

module.exports.updateOferAnswer = async(data)=> {
    try {
        await employmentOferModel.update({
            answered : 1
        }, {
            where : {
                id : data.id
            }
        });
        await responseToOferModel.create({
            idOfOfer : data.id,
            oferedBy : data.fromwho,
            oferedTo : data.towho,
            answer : data.answer
        })
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al responder oferta [ofers.services.js]');
    }
};


module.exports.findOfersByCriteriaService = async(criteria) => {
    try {
        let result = await employmentOferModel.findAll({where : criteria});
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al encontrar oferta [ofers.services.js]');
    }
}