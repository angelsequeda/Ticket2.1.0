//Los controladores para las ofertas de trabajo

const { createNewOfer, deleteOfer } = require("../services/offers.services")

module.exports.newOferController = async(req,res) => {
    try {
        await createNewOfer(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
};

module.exports.deleteOferController = async(req,res) => {
    try {
        await deleteOfer(req.body);
        return res.status(200).json({message : 'correcto'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}