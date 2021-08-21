//Los controladores para los usuarios que pertenecen a una compañia

const {  addCompanyEmployeeService, updateCompanyEmployeeService, searchForCompanyEmployee, searchForCompanyEmployeeService, deleteCompanyEmployeeService } = require("../services/company.services");
const { encryptJsonToken } = require("../services/security.services");

//Para añadir un nuevo colaborador a la base de datos
module.exports.addCompanyEmployeeController = async(req,res) => {

    try {
        
        let newCompany = await addCompanyEmployeeService(req.body);
        return res.status(200).json(newCompany);

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con el registro'});
    }
};

//Actualizar datos del usuario tipo compañia
module.exports.updateCompanyEmployeeController = async (req,res) => {

    try {
        
        let updatingCompany = await updateCompanyEmployeeService(req.body);
        let updatedCompany = await searchForCompanyEmployeeService(req.body);
        return res.status(200).json({message:updatingCompany.message,result:updatedCompany.result});

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message:'Algo ha salido mal con la actualizacion del usuario'});
    }
};
//Dar de baja a un usuario tipo compañia
module.exports.deleteCompanyEmployeeController = async (req,res) => {

    try {
        
        let result = await deleteCompanyEmployeeService(req.body);
        return res.status(200).json(result);

    } catch (error) {

        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con el borrado del usuario'});
        
    }
};
//Buscar un usuario tipo compañia 
module.exports.searchForCompanyEmployeeController = async (req,res) => {

    try {
        
        let userFound = await searchForCompanyEmployeeService(req.body);
        userFound.result.password = req.body.password;
        let token = encryptJsonToken(userFound.result.username,userFound.result.idCompanyUser,'comapny');
        return res.status(200).json({message:'correcto',result:userFound.result,token:token});

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message:'Algo ha salido mal con la busqueda del usuario'});
    }
}