const employmentOferModel = require("../models/employmentofer.model");

module.exports.createNewOfer = async(data) => {
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
        await employmentOferModel.destroy({where : {fromwho : data.fromwho , towho : data.towho}});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al eliminar oferta [offers.services.js]');
    }
};

