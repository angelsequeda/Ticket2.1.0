const { decryptJsonToken } = require("../services/security.services")


module.exports.canYouMakeAnOffer = async (req,res,next)=> {
    try {
        let tokenreceived = decryptJsonToken(req.body.token);
        if(tokenreceived.role === "company"){
            next();
        }else {
            return res.status(409).json({message : 'Usted no esta autorizado para hacer una oferta de trabajo'});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.whatRoleOfferisYours = async (req,res,next)=> {
    try {
        let tokenreceived = decryptJsonToken(req.body.token);
        if(tokenreceived.role === "company" || tokenreceived.role === "tecler"){
            req.body.role = tokenreceived.role;
            next();
        }else{
            return res.status(409).json({message  :'No autorizado'});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}