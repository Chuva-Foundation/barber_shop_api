
const User = require("../models/UsersM");

exports.regist = async(req,res)=>{

    const {name, username, phone, email, photo, password, user_type_id} = req.body;
    const user_resg = await User.Regist_User(name, username, phone, email, photo, password, user_type_id); 
    res.status(201).json({user_resg});   
}

exports.getusers = async (req, res) =>{
    const user = await User.SelectUsers();
    res.status(200).json(user);
}

exports.getemail = async(req, res) =>{
    const {email} = req.body;
    const get_email = await User.SelectByEmail(email);
    res.status(200).json(get_email);
}
