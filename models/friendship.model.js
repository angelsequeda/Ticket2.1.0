const sequelize = require('../db/connection');
const {Model, DataTypes} = require('sequelize');

class friendshipModel extends Model{};

friendshipModel.init({
    friend1id:{
        type : DataTypes.STRING,
        allowNull : false
    },
    friend2id : {
        type : DataTypes.STRING,
        allowNull : false
    },
    friend1name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    friend2name : {
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

module.exports = friendshipModel;
