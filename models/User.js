const db = require('../config/database');
const bcrypt = require('bcrypt');

class User{
    /*resgister user */
    static async RegistUser(name, email, phone, password, user_type_id) {
        const salt = await bcrypt.genSalt()
        const pass_hash = await bcrypt.hash(password, salt);
        try {
          await db.query("INSERT INTO users (name, email, phone, password, user_type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, phone, pass_hash, user_type_id]);  
        } catch (error) {
            console.error(error.message);
        }
    }
     /*Selecting user who are client */
    static async SelectClient(){
        try {
         const client = await db.query("SELECT name, email, phone FROM users JOIN user_type ON user_type_id = user_type.id WHERE user_type.type ='cliente'"); 
         return client.rows;
        } catch (error) {
            console.log(error.message);
            
        }
    }
     /*Selecting user who are employee */
    static async SelectFunc(){
        try {
            const employee = await db.query("SELECT name, email, phone FROM users JOIN user_type ON user_type_id = user_type.id WHERE user_type.type ='funcionario'"); 
            return employee.rows;
           } catch (error) {
               console.log(error.message);
               
           }
    }
    /*Selecting user by email */ 
    static async getByEmail(email) {
        try {
            const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            return user.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    }

    static async checkPassword(password, password_hash) {
        return await bcrypt.compare(password, password_hash);
    }
}
module.exports = User;