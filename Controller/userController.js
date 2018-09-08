var app = require('../app');
var express = require('express');
var trans = express.Router();
var routes = require('../routes/dealer');
var database = require('../Database/database');
const dealer = require('../Modules/dealerModule');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var auth = require('../auth/VerifyToken');
var logger = require('../LogConfig/loghelper').logger;



//-Get Users Data based on userid.

exports.getUserInfo = function (req, res) {
    console.log('**** inside getDealerInfo of dealerController.js & data is ****');
    var token = req.headers['x-access-token'];
    auth.verifyToken(token, function (err, decoded) {
        if (err) {
            res.send({
                "Error Code": 00,
                "Message": 'Invalid Token',
                "Error": err
            });
        } else {
            var LogidealerData = {
                DealerID: req.body.DealerID
            }
            dealer.dealerInfo(LogidealerData.DealerID, function (err, results) {
                if (err) {
                    logger.error({
                        err: err
                    }, 'Error Described')
                    res.send({
                        "Error": err,
                    });
                } else {
                    logger.info('Into the final response', results);
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

//- Dealer Registration with token.
exports.dealerRegistration = function (req, res) {
    console.log('**** inside dealerRegistration of dealerController.js & data is ****');
    var hashedPassword = bcrypt.hashSync(req.body.DealerPassword, 8);
    console.log('**** inside hashedPassword of dealerController.js & data is ****');
    var UserInputData = {
        "DealerName": req.body.DealerName,
        "DealerAddress": req.body.DealerAddress,
        "DealerType": req.body.DealerType,
        "DealerPAN": req.body.DealerPAN,
        "DealerPhone": req.body.DealerPhone,
        "ParentID": req.body.ParentID,
        "DealerEmail": req.body.DealerEmail,
        "DealerPassword": hashedPassword

    };
    console.log('**** inside UserInputData of dealerController.js & data is ****');
    dealer.registration(UserInputData, function (err, result, dealrID) {
        if (err) {
            res.send({
                "Error Code": 101,
                "Error": err
            });
        } else {
            // create a token
            var token = jwt.sign({
                DealerID: dealrID,
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.send({
                "error": 0,
                "code": 200,
                "DealerID": dealrID,
                "Data": result,
                "auth": true,
                "Token": token
            });
        }
    });
};


//-Dealer login, generates token.
exports.dealerLogin = function (req, res) {
    var LoginData = {
        DealerEmail: req.body.DealerEmail
    }
    dealer.DealerLogin(LoginData.DealerEmail, function (err, result) {
        console.log('**** result at DealerLogin of dealerController.js ****', result);
        if (result === 'No DataFound') {
            res.send({
                'Error Code': 101,
                Message: 'Email Id not available/Invalid Email Id',
            });
        } else {
            var resultPassword = bcrypt.compareSync(req.body.DealerPassword, result[0].DealerPassword)
            if (!resultPassword)
                return res.status(401).send({
                    auth: false,
                    token: null,
                    Message: 'Password Invalid/Session expired',
                });
            var token = jwt.sign({
                DealerEmail: req.body.DealerEmail
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token,
            });
        }
    });
};