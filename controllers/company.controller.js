//Los controladores para los usuarios que pertenecen a una compañia

const {  addCompanyEmployeeService, updateCompanyEmployeeService, searchForCompanyEmployee, searchForCompanyEmployeeService, deleteCompanyEmployeeService } = require("../services/company.services")


module.exports.addCompanyEmployeeController = async(req,res) => {

    try {
        
        let newCompany = await addCompanyEmployeeService(req.body);
        return res.status(200).json(newCompany);

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con el registro'});
    }
};


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

module.exports.deleteCompanyEmployeeController = async (req,res) => {

    try {
        
        let result = await deleteCompanyEmployeeService(req.body);
        return res.status(200).json(result);

    } catch (error) {

        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con el borrado del usuario'});
        
    }
};

module.exports.searchForCompanyEmployeeController = async (req,res) => {

    try {
        
        let result = await searchForCompanyEmployeeService(req.query);
        return res.status(200).json(result);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message:'Algo ha salido mal con la busqueda del usuario'});
    }
}