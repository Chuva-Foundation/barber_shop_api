const Hour = require('../models/Hour');


exports.create = async (req, res) => {
    const { data, hour_ini, hour_final, scheduling_id } = req.body;

    await Hour.Create(data, hour_ini, hour_final, scheduling_id);
 
    res.status(201).send();
}

exports.get = async (req,res) =>{
    const hour = await Hour.Selectall();
    res.status(200).json(hour);
}