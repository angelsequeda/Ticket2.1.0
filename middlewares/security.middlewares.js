const { decryptJsonToken } = require("../services/security.services")

module.exports = updateMiddleware = (req,res,next) => {
    let tokenReceived = decryptJsonToken(req.body.token);
    if(tokenReceived.role === 'tecler') {
        if(tokenReceived.iduser === req.body.data.idTecler){
            return next();
        }else {
            return res.status(400).json('Usuario no autorizado');
        }
    }else if(tokenReceived.role === 'company') {
        if(tokenReceived.iduser === req.body.data.idCompanyUser){
            return next();
        }else{
            return res.status(400).json('Usuario no autorizado');
        }
    }else if(tokenReceived.role === 'evaluator'){
        if(tokenReceived.iduser === req.body.data.idCompanyUser){
            return next();
        }else{
            return res.status(400).json('Usuario no autorizado');
        }
    }else {
        return res.status(400).json('Usuario no autorizado');
    }
}