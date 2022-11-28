const db = require('../config/database');

exports.has_client_access = async(req, res, next)  => {
    
    const { id } = req.body;

    const employee_name = "cliente";

    try {
        const employee_type = await db.query("SELECT * FROM user_type WHERE type =$1",[employee_name]);
        //console.log("fine",employee_type.rows[0].id);

        const employee = await db.query("SELECT * FROM users WHERE id = $1 AND user_type_id = $2",[id, employee_type.rows[0].id]);
        //console.log("ver",employee.rows);
        if (!employee.rows[0]) {
            return res.status(403).json({ error: 'Forbidden'});
        }
        next();

    } catch (error) {
        console.error(error.message);
    }
}