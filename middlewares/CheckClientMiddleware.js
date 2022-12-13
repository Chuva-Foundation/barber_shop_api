const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.has_client_access = async(req, res, next)  => {

    const auth = req.headers.authorization;
    const [,token] = auth.split(' ');
    const decoded = jwt.decode(token);

    const client_name = "employee";

    try {
        const client_type = await db.query("SELECT * FROM user_types WHERE type =$1",[client_name]);

        const employee = await db.query("SELECT * FROM users WHERE id = $1 AND user_type_id = $2",[decoded.id, client_type.rows[0].id]);

        if (!employee.rows[0]) {
            return res.status(403).json({ error: 'Forbidden'});
        }
        next();

    } catch (error) {
        console.error(error.message);
    }
}
