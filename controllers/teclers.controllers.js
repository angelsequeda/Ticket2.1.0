//Los controladores para los teclers

const { addTeclerService, searchForTeclerService } = require('../services/teclers.services');


module.exports.addTeclerController = async (req,res) => {

    try {
        
        let result =  await addTeclerService(req.body);
        return res.status(200).json(result);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json('Algo ha salido mal con el registro')
    }
};

module.exports.searchForTeclerController = async(req,res) => {

    try {
        console.log(req.body);
        let result = await searchForTeclerService(req.query);
        return res.status(200).json(result);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json('Algo ha salido mal con la búsqueda')
    }
}

