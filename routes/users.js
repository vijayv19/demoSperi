var express = require('express');
var router = express.Router();
var usercontroller = require('../Controller/userController');



router.post('/', userController.getUserInfo);

router.post('/', transactionController.makePayment);
router.post('/buyCredits', transactionController.buyCredits);