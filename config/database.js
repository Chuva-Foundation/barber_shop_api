const Type = require("../models/UserType");

const Pool = require("pg").Pool;

const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"Root-1234",
    database:"barbershop"
});

module.exports = pool;
