const db = require('../config/database');

class Service{

    static async create(service, price, duration, user_id){
        try {
            await db.query("INSERT INTO services (service, price, duration, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [service, price, duration, user_id]); 
          } catch (error) {
              console.error(error.message);
          }
    }

    static async select(){
        try {
            const services = await db.query("SELECT service, price, duration, user_id FROM services"); 
            /*lembra que el te retorna um array [] */
            return services.rows;
           } catch (error) {
               console.log(error.message);
               
           }
    }

   //Select service by id
   static async selectById(id)
   {
       try {
           const service = await db.query("SELECT service, price, duration, user_id FROM services WHERE id = $1",[id]);
            return service.rows;  
        } catch (error) {
           console.error(error.message);
       }
   }

   // Delete service
    static async delete(id) {
        
        try {
          await db.query('DELETE FROM services WHERE id = $1 RETURNING *',[id]);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    // Update service
    static async update(service, duration, price, id){
        try {
            await db.query('UPDATE services SET service = $1, duration = $2, price = $3, WHERE id = $4',[service, duration, price, id]);
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = Service;