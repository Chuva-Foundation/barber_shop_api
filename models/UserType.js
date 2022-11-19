const db = require('../config/database');

class Type{
    static async Selectall(){
        try{
            const type = await db.query("SELECT type FROM type");
            return type.rows;          
        } catch (error) {
            console.error(error.message);
        }
    }

    static async Create(type)
    {
        try{
            await db.query("INSERT INTO type (type) VALUES($1) RETURNING *", [type]);  
        } catch (error) {
            console.error(error.message);
        }
    }
}
module.exports = Type;