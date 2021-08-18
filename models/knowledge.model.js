const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');

class knowledgeModel extends Model{};

knowledgeModel.init({
    
    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    towho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    namefrom : {
        type: DataTypes.STRING,
        allowNull: false
    },
    nameto :{
        type : DataTypes.STRING,
        allowNull : false
    },
    databaseKnowledge: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    apis: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    testing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    security: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    objectTeory: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'KNOWLEDGES'
});

knowledgeModel.sync();

module.exports = knowledgeModel;