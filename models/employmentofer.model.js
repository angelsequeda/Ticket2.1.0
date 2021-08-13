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
        allowNull: false
    },
    ofer:{
        type:DataTypes.STRING(2000),
        allowNull: false
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

employmentOferModel.belongsToMany(companyModel,{through:'fromwho',foreignKey:'idCompany'});
employmentOferModel.belongsToMany(teclerModel,{through:'towho',foreignKey:'idTecler'});
employmentOferModel.sync();