var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '699aV4KbozH2thhs',
    database: 'quiz',
    port: 3307,
    insecureAuth: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;