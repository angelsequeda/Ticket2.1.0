

///Un controlador para subir imagenes y devolverlas

module.exports.sendAnImmageController = async (req,res)=> {
    try {
        console.log(req);
        return res.status(200).json({message : 'correcto', result : req.file.path});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'error'});
    }
}