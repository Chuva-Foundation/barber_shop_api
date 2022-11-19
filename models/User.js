const db = require('../config/database');
const bcrypt = require('bcrypt');

class User{

    static async RegistUser(name, email, phone, password, user_type_id) {
        const salt = await bcrypt.genSalt()
        const pass_hash = await bcrypt.hash(password, salt);
        try {
          await db.query("INSERT INTO users (name, email, phone, password, user_type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, phone, pass_hash, user_type_id]);  
        } catch (error) {
            console.error(error.message);
        }
    }

    static async SelectClient(){
        try {
         const client = await db.query("SELECT name, email, phone FROM users JOIN user_type ON user_type_id = user_type.id WHERE user_type.type LIKE 'cliente'"); 
         return client.rows;
         console.log(client.rows);
        } catch (error) {
            console.log(error.message);
            
        }
    }

}
module.exports = User;