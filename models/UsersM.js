const db = require('../config/database');
const bcrypt = require('bcrypt');

class User{

    static async Regist_User(name, username, phone, email, photo, password, user_type_id){
        
        const salt = await bcrypt.genSalt();
        const pass_hash = await bcrypt.hash(password, salt);

        try {
            const user = await db.query("INSERT INTO users (name, username, phone, email, photo, password, user_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",[name, username, phone, email, photo, pass_hash, user_type_id]);
            return user.rows[0];
        } catch (error) {
            console.error(error.message);
        }

    }

    static async SelectUsers(){
        try {
            const users =  await db.query("SELECT * FROM users");
            console.log(users.rows)
            return users.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async SelectByEmail(email){
        try {
            const users =  await db.query("SELECT * FROM users WHERE email = $1",[email]);
            return users.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    }

    static async checkPassword(password, pass_hash) {
        return await bcrypt.compare(password, pass_hash);
    }
}
module.exports = User;