const db = require('../config/database');

class Hour{

    static async RegistHour(data, hour_ini, hour_final, scheduling_id){
        try {
            await db.query("INSERT INTO hour (data, hour_ini, hour_final, scheduling_id) VALUES ($1, $2, $3, $4) RETURNING *",[data, hour_ini, hour_final, scheduling_id]);
        } catch (error) {
            console.error(error.message);
        }
    }

    static async SelectHour(){
        try {
            const hours = await db.query("SELECT data, hour_ini, hour_final, scheduling_id FROM hour");
            return hours.row;
        } catch (error) {
            console.error(error.message);
        }
    }
}
module.exports = Hour;