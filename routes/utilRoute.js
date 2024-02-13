const express = require('express');
const userController = require('../controllers/userController');
const emailController = require('../utils/emailController');
const authMiddle = require("../middlewares/authMiddle")
const smsController = require('../utils/smsController')

const router = express.Router();


router.route('/sendotp')
  .post(emailController.sendOTP)

router.route('/verifyotp')
  .post(emailController.verifyOTP)

router.route('/sendsms')
  .get(smsController.sendSMS)


module.exports = router;
