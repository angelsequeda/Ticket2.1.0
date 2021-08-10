//Se inicia la conexion a base de datos llamada TECLANET
const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('TECLANET',null,null, {

    dialect: 'mssql',
  server: process.env.HOST,
  port: process.env.DBPORT ,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: true,
        userName: process.env.DBUSR,
        password: process.env.DBPASS
      }
    },
  }

});

module.exports = sequelize;