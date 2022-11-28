const db = require('../config/database');

class Agenda {
    static async RegistAgenda(service_id, hour) {
        try {

            await db.query("INSERT INTO scheduling ( service_id, hour) VALUES ($1, $2) RETURNING *",[service_id, hour]);
        
        } catch (error) {
            console.error(error.message);
        }
    }

    static async GetAgenda(){
        try {
            const hours = await db.query("SELECT users.name,services.service,hour,services.duration FROM scheduling JOIN users ON scheduling.user_id = users.id JOIN services ON scheduling.service_id = services.id WHERE scheduling.user_id IS NOT NULL");  
            return hours.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async GetAgenFree(){
        try {
            const free = await db.query("SELECT users.name,services.service,hour,services.duration FROM scheduling JOIN users ON scheduling.user_id = users.id JOIN services ON scheduling.service_id = services.id WHERE scheduling.user_id IS NOT NULL");
            return free.rows;
        } catch (error) {
            
        }
    }
}

module.exports = Agenda;