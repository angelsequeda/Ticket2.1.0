const imagesModel = require('../models/images.model');

module.exports.newImageService = async(filename) => {
  
  let todaydate = new Date();
  let code = todaydate.getFullYear() + todaydate.getMonth() + todaydate.getDate() + todaydate.getHours() + todaydate.getMinutes() + todaydate.getSeconds() + todaydate.getMilliseconds() + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

  try{
    await imagesModel.create({
      idImages: code, 
      filename: filename
    })
  }catch (error) {
    console.log(error.message);
    throw new Error('Error en registro de Tecler[teclers.services.js]');
  }
}


module.exports.getImageService

