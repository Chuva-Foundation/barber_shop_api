const jwt = require('jsonwebtoken');
require('dotenv').config();

function jsonTokens({id,name,email}){
    const user = {id, name, email};
    const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5s'});
    const refreshToken =jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10s'});
    return ({accessToken,refreshToken})
}

module.exports = {jsonTokens};