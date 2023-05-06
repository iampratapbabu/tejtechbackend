const express = require('express');
const userController = require('../controllers/userController');
const emailController = require('../utils/emailController');
const authMiddle = require("../middlewares/authMiddle")
const smsController = require('../utils/smsController')

const router = express.Router();

router.route('/')
  .get(userController.getAllUsers)

  //auth routes
router.route('/signup')
  .post(userController.signup)

router.route('/login')
  .post(userController.loginUser)

router.route('/getme')
  .get(authMiddle.protect, userController.getMe)

router.route('/sendotp/:id')
  .get(emailController.sendOTP)

router.route('/sendsms')
  .get(smsController.sendSMS)

  router.route('/transactions')
  .get(authMiddle.protect, userController.getAllTransactions)
  .post(authMiddle.protect,userController.createTransaction)

module.exports = router;
