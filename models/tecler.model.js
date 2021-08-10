//En este archivo se encuentra el modelo de los usuarios TECLERS de la app
const {Model,Deferrable, DataTypes} = require('sequelize');

class teclerModel extends Model{};

teclerModel.init({
    num_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    idTecler: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false
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
    education: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lenguages: {
        type: DataTypes.STRING,
        allowNull: false
    },
    social: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hobbies: {
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
    createdAt: false,
    updatedAt: false,
    timestamps: false
});

teclerModel.sync();

module.exports = teclerModel;