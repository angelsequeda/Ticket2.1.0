//Todos los servicios usados en los ednpoints de los teclers

const teclerModel = require("../models/tecler.model");

module.exports.addTeclerService = async(data) => {

    let todaydate = new Date();
    let code = todaydate.getFullYear() + todaydate.getMonth() + todaydate.getDay() + todaydate.getHours() + todaydate.getMinutes() + todaydate.getSeconds() + todaydate.getMilliseconds() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    try {
        await teclerModel.create({idTecler: code, profilePhoto: data.profilePhoto, name: data.name, city: data.city, country: data.country, age: data.age, education: data.education, lenguages: data.lenguages, social: data.social, hobbies: data.hobbies, registered: todaydate.getFullYear() + '-' + todaydate.getMonth() + '-'+ todaydate.getDay(), active: 1});
        return ({message: 'Usuario registrado con exito', id: code})

    } catch (error) {
        console.log(error.message);
        throw new Error('Error en registro de Tecler[teclers.services.js]');
    }
};

module.exports.searchForTeclerService = async(data) => {

    try {
        let result = await teclerModel.findOne({
            where: {
                idTecler: data.idTecler,
                active: 1
            }
        });
        return {message: 'Usuario encontrado',result: result}
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar usuario [teclers.services.js]')
    }
}