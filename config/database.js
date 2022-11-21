const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"Root-1234",
    database:"barbershop"
});

/*const pool = new Pool({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database
});*/

module.exports = pool;
