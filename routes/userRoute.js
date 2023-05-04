const express = require('express');
const userController = require('../controllers/userController');
const emailController = require('../controllers/emailController');
const authMiddle = require("../middlewares/authMiddle")
const smsController = require('../controllers/smsController')

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



module.exports = router;
