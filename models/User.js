const db = require('../config/database');
const bcrypt = require('bcrypt');

class User{
    /*resgister user */
    static async RegistUser(name, email, phone, password, user_type_id) {
        const salt = await bcrypt.genSalt()
        const pass_hash = await bcrypt.hash(password,salt);
        try {
          await db.query("INSERT INTO users (name, email, phone, password, user_type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, phone, pass_hash, user_type_id]);  
        } catch (error) {
            console.error(error.message);
        }
    }
    /*Selecting user by email */ 
    static async getByEmail(email) {
        try {
            const user = await db.query('SELECT * FROM users WHERE email = $1',[email]);
            return user.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async checkPassword(password,pass_hash) {
        return await bcrypt.compare(password,pass_hash);
    }
}
module.exports = User;