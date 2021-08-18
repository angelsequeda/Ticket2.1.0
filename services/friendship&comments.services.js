const commentaryModel = require("../models/commentary.model");
const friendshipModel = require("../models/friendship.model");


module.exports.newFriendshipRequestService = async(data) => {
    try {
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
module.exports.findFriendshipByCriteria = async(criteria) => {
    try {
        let result = await friendshipModel.findAll({where : criteria});
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al encontrar amistad entre los dos f&c services.js');
    }
}
module.exports.deleteFriendshipService = async(data) => {
    try {
        await friendshipModel.destroy(
            {where : {
                friend1id : data.id1,
                friend2id : data.id2
            }}
        );
        await commentaryModel.destroy({
            where : {
                fromwho : data.id1,
                towho : data.id2
            }
        });
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al eliminar amistad f&c services.js');
    }
};

module.exports.createNewCommentService = async(data) => {
    try {
        await commentaryModel.create({
            frowho : data.id1,
            towho : data.id2,
            fromwhoname : data.id1,
            towhoName : data.id2,
            commentary : data.commentary
        })
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al agregar comentario f&c services.js');
    }
};

