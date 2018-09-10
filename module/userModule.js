var express = require('express');
// var database = require('../Database/database');
var database = require('../Config/db_config');

var _ = require('lodash');
var logger = require('../logs/logInfo').logger;

//- Get User data by email,passing req through body.

module.exports.userInfo = function (UsersData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            var query, obj;
            if (!_.isEmpty(UsersData.email)) {
                query = 'SELECT * FROM users WHERE email = ?';
                obj = UsersData.email;
            } else if (UsersData.userid) {
                query = 'SELECT * FROM users WHERE userid = ?';
                obj = UsersData.userid;
            } else {
                query = 'SELECT * FROM users';
                obj = UsersData;
            }
            // console.log('**** obj ****', obj);
            connection.query(query, obj, function (err, results) {
                if (err) {
                    logger.error({
                        err: err
                    }, 'Error Described');
                    callback(err, null);
                } else if (_.isEmpty(results)) {
                    // results will have value null, if data is not available in the collection/table
                    callback(null, 'noDataFound');
                } else {
                    callback(null, results);
                }
            });
            connection.release();
        }
    });
};

//Create new user.

module.exports.registration = function (userData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            connection.query('INSERT INTO users SET ?', userData, function (err, rows) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(userData)) {
                    callback(null, 'noDataFound');
                } else {
                    callback(null, userData, rows.insertId);
                }
            });
        }
    });
};

// Delete User on the basis of email id

module.exports.deleteUser = function (deleteData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            connection.query('DELETE FROM users WHERE email = ?', deleteData, function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};