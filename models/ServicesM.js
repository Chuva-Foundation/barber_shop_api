const db = require('../config/database');

class Service{

    static async getServices(){
        try {
            const services =  await db.query("SELECT * FROM services");
            return services.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async createServices(name, description, price, user_id){
        
        try {
            const services = await db.query("INSERT INTO services (name, description, price, user_id) VALUES ($1, $2, $3, $4)",[name, description, price, user_id]);
            return services.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    }

}
module.exports = Service;