const jwt = require("jsonwebtoken");
const {promisify} = require('util');
require ('dotenv');

module.exports =async(req,res,next) =>{

    const auth = req.headers.authorization;

    if(!auth)
    {
        return res.status(401).json({
            error: true,
            code: 130,
            message:"The Authetication Token doesn't exist!"
        });
    }
    const [,token] = auth.split(' ');
    
    try {
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET);
        if(!decoded){
            return res.status(401).json({
                error: true,
                code: 130,
                message:"The Authetication Token doesn't exist!"
            });
        }else{
            req.user_id = decoded.id;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            error: true,
            code: 130,
            message:"Token expire!"
        });
    } 

}