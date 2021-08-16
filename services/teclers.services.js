//Todos los servicios usados en los ednpoints de los teclers

const commentaryModel = require("../models/commentary.model");
const educationModel = require("../models/educaition.model");
const habilityModel = require("../models/habilities.model");
const hobbieModel = require("../models/hobbies.model");
const lenguageModel = require("../models/lenguage.model");
const socialModel = require("../models/socialnets.model");
const teclerModel = require("../models/tecler.model");
const { encryptPassword } = require("./security.services");

module.exports.addTeclerService = async(data) => {

    let todaydate = new Date();
    let code = todaydate.getFullYear() + todaydate.getMonth() + todaydate.getDate() + todaydate.getHours() + todaydate.getMinutes() + todaydate.getSeconds() + todaydate.getMilliseconds() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)+'tecler';

    try {
        await teclerModel.create({idTecler: code, profilePhoto: data.profilePhoto, name: data.name, city: data.city, country: data.country, age: data.age, registered: todaydate.getFullYear() + '-' + todaydate.getMonth() + '-'+ todaydate.getDate(), active: 1, username: data.username, mail: data.mail,tellUsSomething:data.tellUsSomething, password:encryptPassword(data.password)});
        return ({message: 'Usuario registrado con exito', id: code})

    } catch (error) {
        console.log(error.message);
        throw new Error('Error en registro de Tecler[teclers.services.js]');
    }
};

module.exports.searchForTeclerService = async (data) => {

    try {
        let result = await teclerModel.findOne({
            where: {
                username: data['username'],
                active: 1
            },
            attributes:{exclude:['num_usuario']}, raw : true
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
            tellUsSomething: data.tellUsSomething,
            password: encryptPassword(data.password)
        }, {
            where: {
                idTecler: data.idTecler,
            }
        });

        return {message: 'correcto'};
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al actualizar usuario [tecler.services.js]')
    }
};

module.exports.deleteTeclerService = async(data) => {
    console.log(data);
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

module.exports.searchTeclerExtraInfo = async(data) => {
    try {
       let habilities = await habilityModel.findAll({where : {who : data}});
       let hobbies = await hobbieModel.findAll({where : {whoDoesIt : data}});
       let lenguages = await lenguageModel.findAll({where : {whoSpeaks : data}});
       let socials = await socialModel.findAll({where : {who : data}});
       let comments = await commentaryModel.findAll({where : {towho : data}});
       let studies = await educationModel.findAll({where : {who : data}});
       return {habilities,hobbies, lenguages, socials, comments, studies};
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar info extra [tecler.services.js]')
    }
};

module.exports.deleteTeclerExtraInfo = async(data) => {
    try {
        await habilityModel.destroy({where : {who : data.idTecler}});
        await hobbieModel.destroy({where : {whoDoesIt : data.idTecler}});
        await lenguageModel.destroy({where : {whoSpeaks : data.idTecler}});
        await socialModel.destroy({where : {who : data.idTecler}});
        await educationModel.destroy({where: {who: data.idTecler}});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al eliminar info extra [tecler.services.js]');
    }
};


module.exports.addTeclerExtraInfo = async(data) => {
    try {
        data.extraInfo.habilities.forEach(async(element)=> {
            await habilityModel.create({
                who : data.idTecler,
                what : element.what
            });
        });

        data.extraInfo.hobbies.forEach(async(element) => {

            await hobbieModel.create({
                whoDoesIt : data.idTecler,
                howLong : element.howLong,
                hobbie: element.hobbie,
                tellSomething : element.tellSomething
            });
        });

        data.extraInfo.lenguages.forEach(async (element) => {
            await lenguageModel.create({
                whoSpeaks : data.idTecler,
                lenguage : element.lenguage,
                howLong : element.howLong,
                location : element.location,
                degree : element.degree
            })
        });

        data.extraInfo.socials.forEach(async (element) => {
            await socialModel.create({
                who : data.idTecler,
                SocialMedia : element.SocialMedia,
                link : element.link
            })
        });

        data.extraInfo.studies.forEach(async(element) => {
            await educationModel.create({
                who : data.idTecler,
                what : element.what,
                location: element.location,
                howLong : element.howLong
        })});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al subir informacion Extra [tecler.services.js]');
    }
}


