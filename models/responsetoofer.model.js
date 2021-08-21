const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');

class responseToOferModel extends Model{};

responseToOferModel.init({
    idOfOfer:{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    oferedBy : {
        type: DataTypes.STRING,
        allowNull : false
    },
    oferedTo:{
        type : DataTypes.STRING,
        allowNull : false
    },
    Answer : {
        type : DataTypes.STRING(2000),
        allowNull : false
    }
}, {
    sequelize,
    timestamps : false,
    createdAt : false,
    updatedAt : false
});

responseToOferModel.sync();
module.exports = responseToOferModel;