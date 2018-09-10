var mysql = require('mysql');
var express = require('express');
var app = express();


if (app.settings.env == 'development') {
    var config = require("../Config/development");
}

if (app.settings.env == 'production') {
    var config = require("../Config/production");
}
// console.log('**** config ****', config);

// connect to MySQL
var connection = mysql.createPool({
    host: config.db_host,
    user: config.db_username,
    password: config.db_password,
    database: config.db_name
});


module.exports.connection = connection;