//Modelo de un comentario incluyendo los ids de quienes los hicieron, sus nombres y el comentario
const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/connection');


class commentaryModel extends Model{};
let today1 = new Date();
let today = new Date(today1.toDateString());

commentaryModel.init({

    towho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromwho:{
        type: DataTypes.STRING,
        allowNull: false
    },
    towhoName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    fromwhoName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    commentary: {
        type: DataTypes.STRING(1000),
        allowNull: true
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
    tableName: 'COMENTS'
});

commentaryModel.sync();

module.exports =  commentaryModel;

