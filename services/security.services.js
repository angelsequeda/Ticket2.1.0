const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.encryptPassword =  (password) => {

    let result = bcrypt.hashSync(password,10);
    return result
}

module.exports.decryptPassword = (encryptedPassword,passwordSaved) => {

    let validation =  bcrypt.compareSync(encryptedPassword,passwordSaved);
    return validation;

}

module.exports.encryptJsonToken = (username,iduser,role)=> {
    
    let token = jwt.sign({iduser:iduser,username:username,role:role},process.env.jsonsign);
    return token;
}


module.exports.decryptJsonToken = (token) => {

    let tokendecrypted = jwt.verify(token,process.env.jsonsign);
    return tokendecrypted;
}