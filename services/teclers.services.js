//Todos los servicios usados en los ednpoints de los teclers

const teclerModel = require("../models/tecler.model");

module.exports.addTeclerService = async(data) => {

    let todaydate = new Date();
    let code = todaydate.getFullYear() + todaydate.getMonth() + todaydate.getDate() + todaydate.getHours() + todaydate.getMinutes() + todaydate.getSeconds() + todaydate.getMilliseconds() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)+'tecler';

    try {
        await teclerModel.create({idTecler: code, profilePhoto: data.profilePhoto, name: data.name, city: data.city, country: data.country, age: data.age, education: data.education, lenguages: data.lenguages, social: data.social, hobbies: data.hobbies, registered: todaydate.getFullYear() + '-' + todaydate.getMonth() + '-'+ todaydate.getDate(), active: 1, username: data.username, mail: data.mail,tellUsSomething:data.tellUsSomething, password:data.password});
        return ({message: 'Usuario registrado con exito', id: code})

    } catch (error) {
        console.log(error.message);
        throw new Error('Error en registro de Tecler[teclers.services.js]');
    }
};

module.exports.searchForTeclerService = async(data) => {
    console.log(data);
    try {
        let result = await teclerModel.findOne({
            where: {
                username: data.username,
                active: 1
            },
            attributes:{exclude:['numUsuario']}
        });
        return {message: 'Usuario encontrado',result: result}
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar usuario [teclers.services.js]')
    }
};

module.exports.updateTeclerService = async(data) => {

    try {
        let result = await teclerModel.update({
            name:data.name,
            profilePhoto: data.profilePhoto,
            city: data.city,
            country: data.country,
            education: data.education,
            hobbies: data.hobbies,
            social: data.social,
            age: data.age,
            lenguages: data.lenguages,
            tellUsSomething: data.tellUsSomething,
            password: data.password
        }, {
            where: {
                idTecler: data.idTecler,
            }
        });

        return {message: 'Usuario actualizado con éxito'};
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al actualizar usuario [tecler.services.js]')
    }
};

module.exports.deleteTeclerService = async(data) => {

    try {
        await teclerModel.update({active:0},{
            where:{
                idTecler: data.idTecler
            }
        })
        return {message: 'Usuario eliminado con éxito'};
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al borrar usuario [tecler.services.js]');
    }
};


