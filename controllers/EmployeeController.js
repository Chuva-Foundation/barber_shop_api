const Employee = require('../models/Employee');
const helpers = require('../utils/jwt_helpers');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await Employee.getByEmail(email);
   
    if (!user) {
        return res.status(401).json({ error: 'Wrong Email.'});
      }
    
    const isPasswordValid = await Employee.checkPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
         error: 'Wrong  Password.'
      })
     }/*else{
       //jwt
       const tokens = helpers.jsonTokens(user.rows[0]);
       res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
       res.json(tokens);
       return res.status(200).json({success:'Log in'})
     }*/
    
}

exports.getfunc = async(req,res) =>{
    const employee = await Employee.SelectFunc();
    res.status(200).json(employee);
}