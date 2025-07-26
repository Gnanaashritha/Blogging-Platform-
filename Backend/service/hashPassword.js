const bcrypt = require('bcrypt');
async function handleHashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    if(!hashPassword){
        console.log("something went wrong");
    }
    return hashPassword 
}
async function handleDecordPassword(hashpassword,password) {
    const isValidPassword = bcrypt.compare(password,hashpassword)
    return isValidPassword;
}
module.exports = {
    handleHashPassword,
    handleDecordPassword
}