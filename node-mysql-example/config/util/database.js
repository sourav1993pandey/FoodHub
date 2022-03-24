const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'node-jwt',
  database: 'foodhub',
  password: 'joypassword1'
});
connection.connect();
module.exports = connection;
