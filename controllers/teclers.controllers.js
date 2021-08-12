//Los controladores para los teclers

const { encryptJsonToken, decryptJsonToken } = require('../services/security.services');
const { addTeclerService, searchForTeclerService, updateTeclerService, deleteTeclerService } = require('../services/teclers.services');


module.exports.addTeclerController = async (req,res) => {

    try {
        
        let teclerNew =  await addTeclerService(req.body);
        console.log(teclerNew);
        return res.status(200).json({message:'Correcto',result: encryptJsonToken(req.body.username,req.body.idTecler,'Tecler')});

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message: 'Error'})
    }
};


module.exports.searchForTeclerController = async(req,res) => {
    console.log(req.body);
    try {
        let TeclerFound = await searchForTeclerService(req.body);
        let token = encryptJsonToken(TeclerFound.result.username,TeclerFound.result.idTecler,'tecler');
        return res.status(200).json({message:'Correcto',result:token});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: 'Error'})
    }
}

module.exports.updateTeclerController = async(req,res) => {

    try {
        
        let updatingTecler = await updateTeclerService(req.body);
        let updatedTecler = await searchForTeclerService(req.body);
        return res.status(200).json({message: 'Correcto', result: updatedTecler.result});

    } catch (error) {

        console.log(error.message);
        return res.status(400).json({message:'Error'});
        
    }
};

module.exports.deleteTeclerController = async(req,res) => {

        try {
            
            let deletingTecler = await deleteTeclerService(req.body);
            return res.status(200).json(deletingTecler);

        } catch (error) {
            
            console.log(error.message);
            return res.status(200).json({message:'Error'});
        }
};

