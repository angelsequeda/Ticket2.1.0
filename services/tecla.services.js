//Los servicios para aquellos usuarios que pertenezcan a tecla

const evaluatorModel = require("../models/evaluator.model")

module.exports.searchForTeclaEvaluatorService = async(data) => {
    
    try {
        let result = await evaluatorModel.findOne({
            where:{
                username: data.username,
                active: 1
            },
            attributes: {exclude:['evaluatorNumber']}
        });
        return {message: 'Usuario encontrado', result: result};
    } catch (error) {
        
        console.log(error.message);
        throw new Error('Error al buscar usuario TECLA [tecla.services.js]');

    }
};

module.exports.addTeclaEvaluatorService = async(data) => {

    try {
        
        let todaydate = new Date();
        let code = todaydate.getFullYear() + todaydate.getMonth() + todaydate.getDate() + todaydate.getHours() + todaydate.getMinutes() + todaydate.getSeconds() + todaydate.getMilliseconds() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + 'evaluator';

        await evaluatorModel.create({idEvaluator: code, profilePhoto: data.profilePhoto, name: data.name,  registered: todaydate.getFullYear() + '-' + todaydate.getMonth() + '-'+ todaydate.getDate(), active: 1, username: data.username, mail: data.mail,job: data.job,tellUsSomething: data.tellUsSomething, password:data.password});

        return {message: 'Usuario registrado con éxito'}

    } catch (error) {

        console.log(error.message);
        throw new Error('Error al agregar evaluador TECLA [tecla.services.js]');
        
    }
};


module.exports.updateTeclaEvaluatorService = async(data) => {

    try {
        
        await evaluatorModel.update({ profilePhoto: data.profilePhoto, name: data.name,username: data.username, mail: data.mail,job: data.job,tellUsSomething: data.tellUsSomething},{where: {idEvaluator: data.idEvaluator}});
        
        return {message:'Usuario actualizado con éxito'};
    } catch (error) {
        console.log(error.messsage);
        throw new Error('Error al actualizar el evaluador TECLA [tecla.services.js]');
    }
}
module.exports.deleteTeclaEvaluatorService = async(data) => {

    try {
        await evaluatorModel.update({active:0},{where: {idEvaluator:data.idEvaluator}});
        return {message: 'Usuario eliminado con éxito'};

    } catch (error) {

        console.log(error.message);
        throw new Error('Error al eliminar evaluador TECLA [tecla.services.js]');
        
    }
};

