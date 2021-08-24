const { sendAnImmageController } = require('../controllers/images.controller');
const { upload } = require('../db/config/cloudinaryConfig');

//Las rutas para subir imagenes
const routerImage = require('express').Router();


routerImage.post('/new',upload.single('image'),sendAnImmageController);

module.exports = routerImage;