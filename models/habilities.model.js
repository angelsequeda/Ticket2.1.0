const sequelize = require("../db/connection");

const {Model, DataTypes} = require('sequelize');

class habilityModel extends Model{};

habilityModel.init({

    who : {
        type: DataTypes.STRING,
        allowNull: false
    },
    what :{
        type: DataTypes.STRING(2000),
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    createdAt : false,
    updatedAt : false,
    tableName : 'HABILITIES'
});

habilityModel.sync();

module.exports = habilityModel;