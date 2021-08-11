const bcrypt = require('bcrypt');


module.exports.encryptPassword =  (password) => {

    let result = bcrypt.hashSync(password,10);
    return result
}

module.exports.decryptPassword = (encryptedPassword,passwordSaved) => {

    let validation =  bcrypt.compareSync(encryptedPassword,passwordSaved);
    return validation;

}

