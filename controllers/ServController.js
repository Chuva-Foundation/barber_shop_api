const Services = require('../models/Service');

exports.get = async (req, res) => {

    const services = await Services.select();
    res.status(200).json(services);
}

exports.selectById = async(req,res) =>{
    const id = parseInt(req.params.id);
    const service_id = await Services.selectById(id);
    res.status(200).json(service_id);       
}

exports.create = async (req, res) => {

 const { service, price, duration , user_id } = req.body;

   await Services.create(service, price, duration, user_id);    

   res.status(201).send();
}

exports.delete = async (req,res)=>{
    const id = parseInt(req.params.id);
    await Services.delete(id);
    res.status(404).json({
        message:'Service Deleted',
    });
}

exports.update = async(req, res)=>{
    const id = parseInt(req.params.id);
    const { service, duration, price } = req.body;
    await Services.update(service, price, duration, id)
    res.status(200).send(`User modified : ${id}`)
}
