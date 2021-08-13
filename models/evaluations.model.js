const {Model,Deferrable,DataTypes} = require('sequelize');
const sequelize = require('../db/connection');
const evaluatorModel = require('./evaluator.model');
const teclerModel = require('./tecler.model');


class evaluationModel extends Model{};

evaluationModel.init({

    towho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    knows : {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: JSON.stringify({database:0, apis:0, testing: 0, sefcurity: 0, objectsteory:0})
    },
    technologies: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: JSON.stringify({nodejs:0, swagger: 0, frontend: 0, javascript: 0})
    },
    performanceTecla: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: JSON.stringify({codequaliyt:0, speed:0, codeperformance: 0})
    },
    sofskills: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: JSON.stringify({focus: 0, teamwork: 0, compromised: 0, communication: 0, learningcapacity: 0, problemresolution: 0})
    },
    profesionalEnviroment:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: JSON.stringify({github:0, trello: 0, stack:0, agile:0})
    },
    registered: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'EVALUATIONS'
});

evaluationModel.belongsToMany(teclerModel,{foreignKey:'idTecler', through: 'towho'});
evaluationModel.belongsToMany(evaluatorModel,{foreignKey:'idEvaluator',through:'fromwho'})

evaluationModel.sync();

