const sequelize = require("../db/connection");
const {Model, DataTypes} = require('sequelize');

class lenguageModel extends Model{};

lenguageModel.init({

    whoSpeaks: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    lenguage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    howLong: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree : {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'LENGUAGES'
});

lenguageModel.sync();

module.exports = lenguageModel;