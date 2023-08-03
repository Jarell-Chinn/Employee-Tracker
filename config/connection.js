// import
const mysql = require("mysql2");
// mysql database

// mysql.createConnection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "MyN3wP4ssw0rd",
    database: "department_db",
  },
  console.log("connected to the database")
);

module.exports = db;
