// Module dependencies

var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
// Application initialization

var sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'demoProject',
});

sqlConnection.connect(function (err) {
    if (err) {
        console.log('**** DB connection failed****', err);
    } else {
        console.log('**** DB connected successfully****');

    }
});

// app.get('/', function (req, res) {
//     sqlConnection.query("SELECT * FROM demoProject", function (err, rows, fields) {
//         if (err) {
//             console.log('**** err in query****', err);
//         } else {
//             console.log('****success fulu query****');

//         }
//     });
// })

// app.listen(8080);

// Database setup

// connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
//     if (err) throw err;
//     connection.query('USE test', function (err) {
//         if (err) throw err;
//         connection.query('CREATE TABLE IF NOT EXISTS users(' +
//             'id INT NOT NULL AUTO_INCREMENT,' +
//             'PRIMARY KEY(id),' +
//             'name VARCHAR(30)' +
//             ')',
//             function (err) {
//                 if (err) throw err;
//             });
//     });
// });

// // Configuration

// app.use(express.bodyParser());

// // Update MySQL database

// app.post('/users', function (req, res) {
//     connection.query('INSERT INTO users SET ?', req.body,
//         function (err, result) {
//             if (err) throw err;
//             res.send('User added to database with ID: ' + result.insertId);
//         }
//     );
// });


// app.listen(3000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
// Raw