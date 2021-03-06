//El modelo de los estudios de un tecler, incluyendo donde los realizo, cuanto tiempo y de que se trato
const sequelize = require("../db/connection");
const {Model, DataTypes} = require('sequelize');

class educationModel extends  Model{};

educationModel.init( {

    who : {
        type : DataTypes.STRING,
        allowNull : false
    },
    what : {
        type : DataTypes.STRING(1000),
        allowNull : false
    },
    location : {
        type : DataTypes.STRING , 
        allowNull : false
    },
    howLong : {
        type  : DataTypes.INTEGER,
        allowNull : false
    }
}, {
    sequelize,
    timestamps : false,
    createdAt : false,
    updatedAt : false,
    tableName : "STUDIES"
});

educationModel.sync();

module.exports = educationModel;