//El modelo de una oferta de empleo

const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/connection');
const companyModel = require('./company.model');
const teclerModel = require('./tecler.model');

class employmentOferModel extends Model{};
let today = new Date();

employmentOferModel.init({

    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    towho: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue : 'public'
    },
    job : {
        type: DataTypes.STRING,
        allowNull : false
    },
    salary : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    ofer:{
        type:DataTypes.STRING(2000),
        allowNull: false
    },
    answer : {
        type : DataTypes.STRING(2000),
        allowNull: true
    },
    answered : {
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0
    },
    registered: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'OFERS'
});

employmentOferModel.sync();
module.exports = employmentOferModel;