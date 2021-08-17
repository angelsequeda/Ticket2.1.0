//Estos son los servicios para aquellas personas que pertenecen a una empresa 

const companyModel = require("../models/company.model");
const { encryptPassword } = require("./security.services");

module.exports.searchForCompanyEmployeeService = async(data) => {

    try {
        
        let result = await companyModel.findOne({
            where: {
                username : data.username,
                active: 1
            },
            attributes:{exclude:['companynumber']}, raw : true
        });
        return {message: 'Usuario encontrado',result: result};

    } catch (error) {
        
        console.log(error.message);
        throw new Error('Error en busqueda de Compañia [company.service.js]')
    }
}

module.exports.addCompanyEmployeeService = async(data) =>{

    try {
        
        let todaydate = new Date();
        let code = todaydate.getFullYear() + todaydate.getMonth() + todaydate.getDate() + todaydate.getHours() + todaydate.getMinutes() + todaydate.getSeconds() + todaydate.getMilliseconds() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + 'company';

        await companyModel.create({idCompanyUser: code, profilePhoto: data.profilePhoto, name: data.name, companyName: data.companyName,  registered: todaydate.getFullYear() + '-' + todaydate.getMonth() + '-'+ todaydate.getDate(), active: 1, username: data.username, mail: data.mail,job: data.job,password: encryptPassword(data.password)});

        return ({message: 'Usuario registrado con exito', id: code})
        
    } catch (error) {
        
        console.log(error.message);
        throw new Error('Error en registro de Compañia [company.service.js]');
    }
};

module.exports.updateCompanyEmployeeService = async(data) => {

    try {
        
        await companyModel.update({ profilePhoto: data.profilePhoto, name: data.name, companyName: data.companyName,   mail: data.mail,job: data.job,password: encryptPassword(data.password)},{where: {idCompanyUser:data.idCompanyUser}});

        return ({message: 'Usuario actualizado con éxito'});

    } catch (error) {
        
        console.log(error.message);
        throw new Error('Error en actualizcion de Compañia [company.service.js]');
    }
};

module.exports.deleteCompanyEmployeeService = async (data) => {

    try {
        
        await companyModel.update({active:0},{where:{idCompanyUser:data.idCompanyUser}});
        return {message:'Usuario eliminado con éxito'};

    } catch (error) {

        console.log(error.message);
        throw new Error('Error en borrar Compañia [company.service.js]')
        
    }
}