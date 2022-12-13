const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.has_employee_access = async(req, res, next)  => {

    const auth = req.headers.authorization;
    const [,token] = auth.split(' ');
    const decoded = jwt.decode(token);

    const employee_name = "employee";

    try {
        const employee_type = await db.query("SELECT * FROM user_types WHERE type =$1",[employee_name]);
        //console.log("fine",employee_type.rows[0].id);

        const employee = await db.query("SELECT * FROM users WHERE id = $1 AND user_type_id = $2",[decoded.id, employee_type.rows[0].id]);
        //console.log("ver",employee.rows);
        if (!employee.rows[0]) {
            return res.status(403).json({ error: 'Forbidden!! You are not an Employee'});
        }
        next();

    } catch (error) {
        console.error(error.message);
    }
}
