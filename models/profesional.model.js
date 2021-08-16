const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');

class profesionalEnviromentModel extends Model{};

profesionalEnviromentModel.init( {

    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    towho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    github: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    trello_jira: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    Slack: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    agile: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'PROFESIONALENVIROMENT'
});

profesionalEnviromentModel.sync();
module.exports = profesionalEnviromentModel;