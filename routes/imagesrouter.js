//las rutas para hacer evaluaciones de las imagenes subidas


const express = require('express');
const routerImages = express.Router()
const { getImage, createImage, removeImage } = require('../controllers/images.controllers')



routerImages.get('/images/:image_id', getImage);
routerImages.post('/images', createImage);
routerImages.delete('/images/:image_id',removeImage);
