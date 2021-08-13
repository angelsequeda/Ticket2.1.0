//Este es el modelo de los usuarios registrados como compañias que pueden hacer ofertas de empleo
const {Model,Deferrable, DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

class companyModel extends Model{};

companyModel.init({

    companynumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    profilePhoto:{
      type: DataTypes.STRING,
      allowNull: true  
    },
    idCompanyUser:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registered: {
        type: DataTypes.STRING,
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
    tableName: 'COMPANIES'
});

companyModel.sync();

module.exports = companyModel;