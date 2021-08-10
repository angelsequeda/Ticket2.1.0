//Los controladores para los teclers

const { addTeclerService, searchForTeclerService, updateTeclerService, deleteTeclerService } = require('../services/teclers.services');


module.exports.addTeclerController = async (req,res) => {

    try {
        
        let teclerNew =  await addTeclerService(req.body);
        return res.status(200).json(teclerNew);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con el registro'})
    }
};

module.exports.searchForTeclerController = async(req,res) => {

    try {
        
        let TeclerFound = await searchForTeclerService(req.query);
        return res.status(200).json(TeclerFound);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con la búsqueda'})
    }
}

module.exports.updateTeclerController = async(req,res) => {

    try {
        
        let updatingTecler = await updateTeclerService(req.body);
        let updatedTecler = await searchForTeclerService(req.body);
        return res.status(200).json({message: 'Usuario actualizado con exito', result: updatedTecler.result});

    } catch (error) {

        console.log(error.message);
        throw new Error('Algo ha salido mal con la actualización de Tecler');
        
    }
};

module.exports.deleteTeclerController = async(req,res) => {

        try {
            
            let deletingTecler = await deleteTeclerService(req.body);
            return res.status(200).json(deletingTecler);

        } catch (error) {
            
            console.log(error.message);
            return res.status(200).json({message:'Algo ha salido mal con la eliminación de Tecler'});
        }
}