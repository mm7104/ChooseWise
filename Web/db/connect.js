const mysql = require("mysql2");

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "choosewise",
//   port: 8111,
// });
const con = mysql.createConnection({
  host: "db4free.net",
  user: "mayukh02",
  password: "mayukh02",
  database: "choosewise",
  port: 3306,
});

con.connect();

module.exports = con;
