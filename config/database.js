const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"Root-1234",
    database:"barber"
});

module.exports = pool;
