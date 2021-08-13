//Este es el modelo para los usuarios registrados de TECLA que podrán evaluar las habilidades de los teclers

const {Model,Deferrable, DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

class evaluatorModel extends Model{};

evaluatorModel.init({

    evaluatorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    idEvaluator: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    profilePhoto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tellUsSomething:{
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registered: {
        type: DataTypes.DATE,
        allowNull: false
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {

    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'EVALUATORS'
});

evaluatorModel.sync();

module.exports = evaluatorModel;