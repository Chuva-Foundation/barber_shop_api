const db = require('../config/database');
 
 class Client {
    /*Selecting user who are client */
    static async SelectClient(){
        try {
        const client = await db.query("SELECT name, email, phone FROM users JOIN user_type ON user_type_id = user_type.id WHERE user_type.type ='cliente'"); 
        return client.rows;
        } catch (error) {
            console.log(error.message);
            
        }
    }
 }

 module.exports = Client;