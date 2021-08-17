//Los controladores para los teclers

const { deleteAllEvaluationsService } = require('../services/evaluations.services');
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
        TeclerFound.result.password = req.body.password;
        let token = encryptJsonToken(TeclerFound.result.username,TeclerFound.result.idTecler,'tecler');
        
        return res.status(200).json({message:'correcto',result:TeclerFound.result,token: token, extras : extraInfo});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: 'error'})
    }
}

module.exports.updateTeclerController = async(req,res) => {

    try {
        console.log(req.body.data);
        let updatingTecler = await updateTeclerService(req.body.data);
        let updatedTecler = await searchForTeclerService(req.body.data);
        if(req.body.data.extraInfo) {
            await deleteTeclerExtraInfo(req.body.data);
            await addTeclerExtraInfo(req.body.data);
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
            await deleteAllEvaluationsService(req.body);
            return res.status(200).json({message:'correcto'});

        } catch (error) {
            
            console.log(error.message);
            return res.status(200).json({message:'error'});
        }
};

module.exports.sendNewTokenController = async(req,res) => {
    try {
        let token = encryptJsonToken(req.body.username,req.body.iduser,req.body.role);
        return res.status(200).json({message : 'correcto', token : token});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message : 'error'});
    }
}