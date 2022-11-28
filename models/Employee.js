const db = require('../config/database');
const bcrypt = require('bcrypt');

class Employee{
    
    static async SelectFunc(){
        try {
            const employee = await db.query("SELECT name, email, phone FROM users JOIN user_type ON user_type_id = user_type.id WHERE user_type.type ='funcionario'"); 
            return employee.rows;
           } catch (error) {
               console.log(error.message);
               
           }
    }

    static async getByEmail(email) {
        try {
            const user = await db.query("SELECT * FROM users WHERE user_type_id = 2 AND email = $1",[email]);
            return user.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async checkPassword(password, pass_hash) {
        return await bcrypt.compare(password, pass_hash);
    }
}
 module.exports = Employee;