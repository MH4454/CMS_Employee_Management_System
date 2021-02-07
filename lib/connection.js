const mysql = require("mysql");
const util = require("util");
require('dotenv').config();

let port = process.env.PORT;
let host = process.env.HOST;
let user = process.env.user
let password = process.env.password
let database = process.env.database

const connection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database || employees
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;
