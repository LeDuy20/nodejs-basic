// Get the client
const mysql = require("mysql2/promise");
require("dotenv").config("");

//test connection
// const connection =  mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_POST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

//test connection
const connection =  mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection