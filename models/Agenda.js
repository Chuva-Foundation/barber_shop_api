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
            const hours = await db.query("SELECT * FROM scheduling");
            return hours.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async GetAgenFree(){
        try {
            const free = await db.query("SELECT * FROM scheduling");
            return hours.rows;
        } catch (error) {
            
        }
    }
}

module.exports = Agenda;