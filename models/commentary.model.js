const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/connection');


class commentaryModel extends Model{};
let today = new Date();

commentaryModel.init({

    towho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    commentary: {
        type: DataTypes.STRING(1000),
        allowNull: true
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
    tableName: 'COMENTS'
});

commentaryModel.sync();

