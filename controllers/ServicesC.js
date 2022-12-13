const Services = require('../models/ServicesM');
const jwt = require('jsonwebtoken');

exports.createservices =async(req,res) =>{
    const auth = req.headers.authorization;

    const [,token] = auth.split(' ');

    const decoded = jwt.decode(token);

    const {name, description, price} = req.body;

    const services_regist = await User.Regist_User(name, description, price,decoded.id); 

    res.status(201).json({services_regist});   

}

exports.getallservices = async (req, res) =>{
    const services = await Services.getServices();
    res.status(200).json(services);
}
