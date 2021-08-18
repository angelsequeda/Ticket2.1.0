const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/connection');
const path = require('path')

class imagesModel extends Model{};
let today = new Date();

imagesModel.init({
  idImages: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  },
  filename:  {
    type: DataTypes.STRING,
    allowNull: false
  },
  views:  {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0
  },
  timestamp:  {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()
  }
},{
  sequelize,
  createdAt: false,
  updatedAt: false,
  timestamps: false,
  tableName:'Images'
})

imagesModel.sync();

module.exports.imagesModel