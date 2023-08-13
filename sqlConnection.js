const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'jkl123',
    database: 'project'
  });
  
  
  connection.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
    
      console.log('Connected to the MySQL server.');
    });

    module.exports = connection;