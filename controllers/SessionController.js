const User = require('../models/User');
const helpers = require('../utils/jwt_helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
try{
    const { email, password } = req.body;
    const user = await User.getByEmail(email);

    if (!user) {
        return res.status(401).json({ error: 'Wrong Email or password.'});
      }
    
    // check if password is valid
    const isPasswordValid = await User.checkPassword(password, user[0].password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Wrong Email or Password.'})}
      else{
      //jwt
      const tokens = helpers.jsonTokens(user.rows);
      res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
      res.json(tokens);
      return res.status(200).json({success:'Loged in'});
     }
  }catch(error){
    res.status(401).json({error:error.message})
  }
}

exports.logout = async (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/login');
}