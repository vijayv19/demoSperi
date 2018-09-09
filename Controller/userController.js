var express = require('express');
var users = require('../module/userModule');
var jwt = require('jsonwebtoken');
var config = require('../config');
var auth = require('../auth/VerifyToken');
var logger = require('../logs/logInfo').logger;



//-Get Users Data based on userid or email id or all userdata

exports.getUserInfo = function (req, res) {
    var token = req.headers['x-access-token'];
    // console.log('****===========token=========== ****', req.body);
    auth.verifyToken(token, function (err, decoded) {
        if (err) {
            res.send({
                "Error Code": 410,
                "Message": 'Invalid Token',
                "Error": err
            });
        } else {
            var UserData = {};
            if (req.body.email) {
                UserData = {
                    email: req.body.email
                };
            } else if (req.body.userid) {
                UserData = {
                    userid: req.body.userid
                };
            } else {
                UserData = '';
            }
            // console.log('****UserData ****', UserData);
            users.userInfo(UserData, function (err, results) {
                if (err) {
                    logger.error({
                        err: err
                    }, 'Error Described');
                    res.send({
                        "Error": err,
                    });
                } else {
                    // logger.info('Into the final response', results);
                    res.send({
                        "error": 0,
                        "code": 200,
                        "Data": results,
                        "Auth": true,
                        "Token Data": token
                    });
                }
            });
        }
    });
};

//- Registration of User with token.
exports.postUserInfo = function (req, res) {
    console.log('**** req.body ****', req.body);
    var UserInputData = {
        "userid": req.body.userid,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "address": req.body.address,
        "status": req.body.status,
        "password": req.body.password,
        "userType": req.body.userType,
        "otp": req.body.otp,
        "dob": req.body.dob
    };
    users.registration(UserInputData, function (err, result, EmailID) {
        if (err) {
            res.send({
                "Error Code": 101,
                "Error": err
            });
        } else {
            // create a token
            var token = jwt.sign({
                email: EmailID,
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.send({
                "error": 0,
                "code": 200,
                "Email": EmailID,
                "Data": result,
                "auth": true,
                "Token": token
            });
        }
    });
};


//-Delete Users, by verifying jwt Token.
exports.deleteUserInfo = function (req, res) {
    var token = req.headers['x-access-token'];
    auth.verifyToken(token, function (err, decoded) {
        if (err) {
            res.send({
                "Error Code": 010,
                "Message": 'Invalid Token',
                "Error": err
            });
        } else {
            var deleteUserData = {
                email: req.body.email
            }
            users.deleteUser(deleteUserData.email, function (err, result) {
                if (err) {
                    res.send({
                        'Error Code': 101,
                        'Error': err
                    });
                } else {
                    res.send({
                        'Success': 200,
                        'Data': result
                    });
                }
            });
        }
    });

};