
const {Model,Deferrable, DataTypes} = require('sequelize');
const sequelize = require('../db/connection');

class hobbieModel extends Model{};

hobbieModel.init( {

    whoDoesIt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    howLong: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hobbie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tellSomething: {
        type: DataTypes.STRING(1000),
        allowNull: true
    }
}, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName:'HOBBIES'
});


hobbieModel.sync();

module.exports = hobbieModel;