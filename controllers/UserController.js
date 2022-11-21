const User = require('../models/User');

exports.create = async(req, res) => {
    
    const { name, email, phone, password, pass_confirm, user_type_id }  = req.body;
    
    if(pass_confirm != password){
        res.status(400);
        res.json({message:"The password confirmation must be the same as password"});
    }else
    {
        await User.RegistUser(name, email, phone, password, user_type_id);
        res.status(201).send();
    }
    
}

exports.get = async(req,res) =>{
    const client = await User.SelectClient();
    res.status(200).json(client);
}

exports.getfunc = async(req,res) =>{
    const client = await User.SelectFunc();
    res.status(200).json(client);
}