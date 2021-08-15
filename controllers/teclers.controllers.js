//Los controladores para los teclers

const { searchEvaluationByCriteria } = require('../services/evaluations.services');
const { encryptJsonToken } = require('../services/security.services');
const { addTeclerService, searchForTeclerService, updateTeclerService, deleteTeclerService, searchTeclerExtraInfo, deleteTeclerExtraInfo, addTeclerExtraInfo } = require('../services/teclers.services');


module.exports.addTeclerController = async (req,res) => {

    try {
        
        let teclerNew =  await addTeclerService(req.body);
        console.log(teclerNew);
        return res.status(200).json(teclerNew);

    } catch (error) {
        
        console.log(error.message);
        return res.status(400).json({message: 'error'})
    }
};



module.exports.searchForTeclerController = async(req,res) => {
    
    try {
        let TeclerFound = await searchForTeclerService(req.body);
        let extraInfo = await searchTeclerExtraInfo(TeclerFound.result.idTecler);
        let token = encryptJsonToken(TeclerFound.result.username,TeclerFound.result.idTecler,'tecler');
        
        return res.status(200).json({message:'correcto',result:TeclerFound.result,token: token, extras : extraInfo});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: 'error'})
    }
}

module.exports.updateTeclerController = async(req,res) => {

    try {
        
        let updatingTecler = await updateTeclerService(req.body.data);
        let updatedTecler = await searchForTeclerService(req.body.data);
        if(req.body.extraInfo) {
            await deleteTeclerExtraInfo(req.body.data);
            await addTeclerExtraInfo(req.body);
        }
        updatedTecler.result.password = req.body.data.password;
        return res.status(200).json({message: 'correcto', result: updatedTecler.result,token:req.body.token});

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

module.exports.searchForTeclerInfoController = async(req,res) => {
    try {
        let evaluations = searchEvaluationByCriteria({towho : req.body.diUser});
        
    } catch (error) {
        
    }
}