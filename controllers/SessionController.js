const User = require('../models/User');
const helpers = require('../utils/jwt_helpers');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.getByEmail(email);

    if (!user) {
        return res.status(401).json({ error: 'Wrong Email.'});
      }
         // check if password is valid
    const isPasswordValid = await User.checkPassword(password, user.password);

    if (!isPasswordValid) {
     return res.status(401).json({
        error: 'Wrong  Password.'
     })
    }else{
      //jwt
      const tokens = Auth.jsonTokens(user.rows);
      res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
      res.json(tokens);
      return res.status(200).json({success:'Log in'})
    }
 
}