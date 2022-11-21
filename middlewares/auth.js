const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authorization = async(req, res, next) => {
    
    const auth_Header = req.headers['auth']; // Bearer TOKEN
    const token = auth_Header && auth_Header.split(' ')[1];
    if(token==null) {
    return res.status(401).json({error:"Not authorized, please log in"});
    }  
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user) =>{
        if(error){
            return res.status(403).json({error:error.message});
        }
    req.user = user;
    next();
    });
}
