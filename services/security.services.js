//Sistemas de encriptacion y desencriptacion
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Encriptar una contraseña
module.exports.encryptPassword =  (password) => {

    let result = bcrypt.hashSync(password,10);
    return result
}
//Desencriptar una contraseña
module.exports.decryptPassword = (encryptedPassword,passwordSaved) => {

    let validation =  bcrypt.compareSync(encryptedPassword,passwordSaved);
    return validation;

}
//Encriptar un token usando el nombre de usuario, el id de usuario y su role (tecler,company,evaluator)
module.exports.encryptJsonToken = (username,iduser,role)=> {
    
    let token = jwt.sign({iduser:iduser,username:username,role:role},process.env.jsonsign);
    return token;
}

//Desencriptar el token
module.exports.decryptJsonToken = (token) => {

    let tokendecrypted = jwt.verify(token,process.env.jsonsign);
    return tokendecrypted;
}