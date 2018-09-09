// Module Dependency

var express = require('express');
var router = express.Router();
var usercontroller = require('../Controller/userController');


// Define routes to call user controller functions

router.get('/findData', usercontroller.getUserInfo);
router.post('/createUserData', usercontroller.postUserInfo);
router.delete('/deleteUser', usercontroller.deleteUserInfo);

module.exports = router;