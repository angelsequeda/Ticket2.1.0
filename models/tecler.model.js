//En este archivo se encuentra el modelo de los usuarios TECLERS de la app
const {Model,Deferrable, DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

class teclerModel extends Model{};

teclerModel.init({
    num_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    idTecler: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tellUsSomething: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
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
    username: {
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
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName:'TECLERS'
});

teclerModel.sync();

module.exports = teclerModel;
