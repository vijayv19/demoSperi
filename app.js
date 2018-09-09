// Module dependencies

var express = require('express');
var mysql = require('mysql');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/users')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));


// parse application/json
app.use(bodyParser.json());


// Create connection to db

// const sqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'demoProject',
// });

// Db Connectivity

// sqlConnection.connect(function (err) {
//     if (err) {
//         console.log('**** DB connection failed****', err);
//     } else {
//         console.log('**** DB connected successfully****');

//     }
// });

// console.log('***process.env.NODE_ENV ****', app.settings.env);


//-create DB demoProject

// app.get('/createdb', function (req, res) {
//     let sql = 'CREATE DATABASE demoProject';
//     sqlConnection.query(sql, function (err, found) {
//         if (err)
//             throw err;
//         console.log('Db created' + found);
//         res.send('Db created successfully..');
//     });
// });


// Create Table

// app.get('/createtable', function (req, res) {
//     let query = 'CREATE TABLE users(userid int PRIMARY KEY,first_name varchar(100) NOT NULL,last_name varchar(100) NOT NULL,email varchar(50) NOT NULL,address varchar(500) NOT NULL,status varchar(20),password varchar(10), otp varchar(10),dob Date, userType varchar(20))';

//     sqlConnection.query(query, function (err, result) {
//         if (err)
//             throw err;
//         console.log(result);
//         res.send('Users table created successfully..');

//     });
// });

// Insert records in User table

// app.get('/insertUser', function (req, res) {
//     let user = {
//         userid: 7,
//         first_name: "deelip",
//         last_name: "chauhan",
//         email: "dillu1010@gmail.com",
//         address: "pune",
//         status: "active",
//         password: "di8@654",
//         otp: "dkd92",
//         dob: "1999-07-07",
//         userType: "user"
//     };
//     let sql = 'insert into users set ?';
//     let inserData = sqlConnection.query(sql, user,
//         function (err, results) {
//             if (err)
//                 throw err;
//             res.send('****data inserted successfully****');
//         });
// });


//select all records of Users table

// app.get('/findall', function (req, res) {
//     let find = 'select * from users';
//     sqlConnection.query(find, function (err, result) {
//         if (err)
//             throw err;
//         console.log(result);
//         res.send(JSON.stringify(result));

//     });
// })


// calls the users router
app.use('/users', userRouter);



// Listening one port 3002

app.listen('3002', function (err) {
    if (err)
        throw err;
    console.log('**** Server started on port 3002 ****');
});