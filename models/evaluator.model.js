//Este es el modelo para los usuarios registrados de TECLA que podrán evaluar las habilidades de los teclers

const {Model,Deferrable, DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

class evaluatorModel extends Model{};

evaluatorModel.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    idEvaluator: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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