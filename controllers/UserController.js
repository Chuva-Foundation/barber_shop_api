const User = require('../models/User');

exports.create = async(req, res) => {
    
    const { name, email, phone, password, pass_confirm, user_type_id }  = req.body;
    const user_exist  = User.getByEmail(email);
    
    if(pass_confirm != password){
        res.status(400);
        res.json({Error:"The password confirmation must be the same as password"});
    }else
    {
        if(!user_exist){           
            await User.RegistUser(name, email, phone, password, user_type_id);
            res.status(201).send();
        } else{
            res.status(400)
            res.json({Error:"User Already Exist"});
        }    
    }
    
}

