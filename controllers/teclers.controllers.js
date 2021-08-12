//Los controladores para los teclers

const { encryptJsonToken } = require('../services/security.services');
const { addTeclerService, searchForTeclerService, updateTeclerService, deleteTeclerService } = require('../services/teclers.services');


module.exports.addTeclerController = async (req,res) => {

    try {
        
        let teclerNew =  await addTeclerService(req.body);
        console.log(teclerNew);
        return res.status(200).json(teclerNew);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message: 'Algo ha salido mal con el registro'})
    }
};



module.exports.searchForTeclerController = async(req,res) => {
    
    try {
        let TeclerFound = await searchForTeclerService(req.body);
        let token = encryptJsonToken(TeclerFound.username,TeclerFound.idTecler,'tecler');
        return res.status(200).json({message:'correcto',result:TeclerFound.result,token: token});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: 'error'})
    }
}

module.exports.updateTeclerController = async(req,res) => {

    try {
        
        let updatingTecler = await updateTeclerService(req.body);
        let updatedTecler = await searchForTeclerService(req.body);
        return res.status(200).json({message: 'correcto', result: updatedTecler.result});

    } catch (error) {

        console.log(error.message);
        return res.status(400).json({message:'error'});
        
    }
};

module.exports.deleteTeclerController = async(req,res) => {

        try {
            
            let deletingTecler = await deleteTeclerService(req.body);
            return res.status(200).json({message:'correcto'});

        } catch (error) {
            
            console.log(error.message);
            return res.status(200).json({message:'error'});
        }
};

