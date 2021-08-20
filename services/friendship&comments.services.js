//Servicios de comentarios y solicitudes de amistad

const commentaryModel = require("../models/commentary.model");
const friendshipModel = require("../models/friendship.model");

//Para generar una nueva solicitud de amistad se requiere el id de los dos usuarios y sus nombres de usuario
module.exports.newFriendshipRequestService = async(data) => {
    try {
        console.log(data);
        await friendshipModel.create({
            friend1id : data.id1,
            friend2id: data.id2,
            friend1name : data.name1,
            friend2name : data.name2
        });
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al solicitar amistad f&c services.js');
    }
};

//Encontrar una solicitud pormedio de un criterio (quien la realizo id1, quien la recibio id2 etc)
module.exports.findFriendshipByCriteria = async(criteria) => {
    try {
        let result = await friendshipModel.findAll({where : criteria,raw: true});
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al encontrar amistad entre los dos f&c services.js');
    }
}

//Eliminar una solicitud (se checan ambos casos en que el usuario hizo la soliciutd o la recibio)
module.exports.deleteFriendshipService = async(data) => {
    try {
        await friendshipModel.destroy(
            {where : {
                friend1id : data.id1,
                friend2id : data.id2
            }}
        );
        await friendshipModel.destroy(
            {where : {
                friend1id : data.id2,
                friend2id : data.id1
            }}
        );
        await commentaryModel.destroy({
            where : {
                fromwho : data.id1,
                towho : data.id2
            }
        });
        await commentaryModel.destroy({
            where : {
                fromwho : data.id2,
                towho : data.id1
            }
        });
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al eliminar amistad f&c services.js');
    }
};
//Crear un nuevo comentario usando los ids de los usuarios (fromwho,towho) y sus nombres (towhoname,fromwhoname)
module.exports.createNewCommentService = async(data) => {
    try {
        await commentaryModel.create({
            fromwho : data.id1,
            towho : data.id2,
            fromwhoName : data.name1,
            towhoName : data.name2,
            commentary : data.commentary
        })
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al agregar comentario f&c services.js');
    }
};

//Aceptar una solicitud cambia su estado accepted de 0 a 1

module.exports.acceptFriendshipService = async (data) => {
    try {
        await friendshipModel.update({accepted : 1},{where : {friend2id : data.id2, friend1id : data.id1}}),
        await friendshipModel.update({accepted : 1}, {where : {friend1id : data.id2, friend2id : data.id1}});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al aceptar solicitud de amistad f&c services.js');
    }
};

