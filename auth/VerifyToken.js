var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports.verifyToken = function (tokenID, callback, next) {
    var token = tokenID;
    if (!token) {
        callback(err, null, 'Token not provided')
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        console.log('**** inside decoded of VerifyToken.js & data is ****', decoded);
        if (err) {
            callback(err, null, 'User is unauthorised');
        } else {
            callback(null, decoded);
        }
    });
};