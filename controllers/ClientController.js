const Client = require('../models/Client');

exports.get = async(req,res) =>{
    const client = await Client.SelectClient();
    res.status(200).json(client);
}