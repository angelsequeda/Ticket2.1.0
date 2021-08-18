//controladores de imagenes
const {randomName} = require('../helpers/libs')
const  {getImageService, newImageService }= require('../services/images.services')
const fs = require('fs-extra');

module.exports.getImage = async (req,res) => {
  try {
    let getImg = getImageService(req.body)
    return res.status(200).json('done')
  }
  catch (error) {
    console.log(error.message);
    return res.status(400).json({message: 'error'})
  }
}


module.exports.createImage = async (req,res) => {
  try {
    const imgURL = randomName();
    console.log(imgURL);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const imageTempPath = req.file.path;
    const targetPath = path.resolve(`back/public/upload/${imgURL}${ext}`);

    
  if(ext == '.png' || ext =='.jpg' ||ext == '.jpeg'){
    await fs.rename(imageTempPath, targetPath);
    let newImage = {
      filename: imgURL + ext
    }
    console.log(newImage)
    let newImg = newImageService(newImage)
   res.send('Imagen subida con exito')
  }
  else {
    await fs.unlink(imageTempPath)
    res.status(500).json('error: solo imagenes')
  }

  }
  catch (error) {
    console.log(error.message);
    return res.status(400).json({message: 'error'})
  }
}

module.exports.removeImage = async (req,res) => {
  try {

    return res.status(200).json('Imagen subida con exito')
  }
  catch (error) {
    console.log(error.message);
    return res.status(400).json({message: 'error'})
  }
}