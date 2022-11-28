const Agenda = require('../models/Agenda');

exports.agendar = async (req, res) => {

  const { service_id, hour } = req.body;

   await Agenda.RegistAgenda(service_id, hour);    

   res.status(201).send();

}

exports.getAgend = async (req,res) =>{
  const scheduling = await Agenda.GetAgenda();
  res.status(200).json(scheduling);
}

exports.get_Frees_sched= async (req,res) =>{
  const sched_free = await Agenda.GetAgenFree();
  res.status(200).json(sched_free);
}