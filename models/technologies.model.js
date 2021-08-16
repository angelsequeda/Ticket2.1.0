
const {Model,Deferrable, DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

class technologyModel extends Model{};

technologyModel.init({

    fromwho: {
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
    nodejs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    frontend: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    swagger: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    javascript: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TECHNOLOGIES'
});

technologyModel.sync();

module.exports = technologyModel;