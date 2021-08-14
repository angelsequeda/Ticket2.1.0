const sequelize = require("../db/connection");

const {Model,DataTypes} = require('sequelize');
const teclerModel = require("./tecler.model");


class socialModel extends Model{};

socialModel.init({

    who: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SocialMedia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'SOCIALMEDIA'
});


socialModel.sync();

module.exports = socialModel;