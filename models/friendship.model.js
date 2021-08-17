const sequelize = require('../db/connection');
const {Model, DataTypes} = require('sequelize');

class friendshipModel extends Model{};

friendshipModel.init({
    friend1:{
        type : DataTypes.STRING,
        allowNull : false
    },
    friend2 : {
        type : DataTypes.STRING,
        allowNull : false
    },
    accepted: {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0
    }
}, {
    sequelize,
    timestamps : false,
    createdAt : false,
    updatedAt : false
});

friendshipModel.sync();

module.exports = friendshipModel();
