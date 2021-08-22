const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');

class responseToOferModel extends Model{};

let today1 = new Date();
let today = new Date(today1.toDateString());

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
    answer : {
        type : DataTypes.STRING(2000),
        allowNull : false
    },
    readed : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0
    },
    registered :{
        type : DataTypes.DATEONLY,
        allowNull : true,
        defaultValue : today.toISOString()
    }
}, {
    sequelize,
    timestamps : false,
    createdAt : false,
    updatedAt : false,
    tableName : 'RESPONSES'
});

responseToOferModel.sync();
module.exports = responseToOferModel;