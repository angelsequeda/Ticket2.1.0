const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');

class performanceModel extends Model{};

performanceModel.init( {

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
    codequality: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    speed :{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    codePerformance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'PERFORMANCES'
});

performanceModel.sync();

module.exports = performanceModel;