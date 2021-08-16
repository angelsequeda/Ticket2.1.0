const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');

class softSkillsMOdel extends Model{};

softSkillsMOdel.init( {

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
    focus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    teamWork: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    compromise: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    communication: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    learningSkill: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    problemResolution: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'SOFTSKILLS'
});

softSkillsMOdel.sync();
module.exports = softSkillsMOdel;