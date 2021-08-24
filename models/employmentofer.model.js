//El modelo de una oferta de empleo

const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/connection');
const companyModel = require('./company.model');
const teclerModel = require('./tecler.model');

class employmentOferModel extends Model{};
let today1 = new Date();
let today = new Date(today1.toDateString());
employmentOferModel.init({

    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    namefrom : {
        type : DataTypes.STRING,
        allowNull : false
    },
    nameto :{
        type : DataTypes.STRING,
        allowNull : false
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
    answered : {
        type: DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0
    },
    registered: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: today.toISOString()
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