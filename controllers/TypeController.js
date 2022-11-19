const Type = require('../models/UserType');

exports.create = async (req, res) => {
    const { type } = req.body;

    await Type.Create(type);
 
    res.status(201).send();
}
exports.select = async (req,res)=>{
    
    const type = await User.Selectall();
    res.status(200).json(type);
}