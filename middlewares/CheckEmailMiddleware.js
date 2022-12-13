const db = require('../config/database');

exports.email_exist = async(req, res, next)  => {
    
    const {email} = req.body;
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows[0] != null) {
            return res.status(409).json({ error: 'The user already exist'});
        }
        next();

    } catch (error) {
        console.error(error.message);
    }
}

