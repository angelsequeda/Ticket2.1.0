//Este es el modelo de los usuarios registrados como compañias que pueden hacer ofertas de empleo
const {Model,Deferrable, DataTypes} = require('sequelize');

class companyModel extends Model{};

companyModel.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
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
    }
}, {

    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

companyModel.sync();

module.exports = companyModel;