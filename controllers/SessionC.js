const User = require('../models/UsersM');
const jwt = require('jsonwebtoken');
require ('dotenv');

exports.login = async (req, res) => {

    const { email, password } = req.body;
  
    const user = await User.SelectByEmail(email);    
  
     if (!user) {
       return res.status(401).json({ error: 'Wrong Email '});
     }
    
     // check if password is valid
     const isPasswordValid = await User.checkPassword(password,user.password);
  
     if (!isPasswordValid) {
       return res.status(401).json({error: 'Wrong Password'});
     }

      res.status(200).json({
        user:{
          name:user.name,
          email:user.email
        },
        token:jwt.sign({id:user.id},
          process.env.SECRET,
          {expiresIn:'6h'})
      });
}