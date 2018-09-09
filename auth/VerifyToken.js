var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports.verifyToken = function (tokenID, callback) {
    var token = tokenID;
    if (!token) {
        callback(null, 'Token not provided');
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            callback(err, null, 'User is Unauthorised');
        } else {
            callback(null, 'User is successfully Authenticated');
        }
    });
};