const express = require('express');
const userController = require('../controllers/userController');
const emailController = require('../utils/emailController');
const authMiddle = require("../middlewares/authMiddle")
const smsController = require('../utils/smsController')

const router = express.Router();

router.route('/')
  .get(userController.getAllUsers)

//AUTH ROUTES
router.route('/signup')
  .post(userController.uploadImage, userController.signup)

router.route('/login')
  .post(userController.loginUser)

router.route('/getme')
  .get(authMiddle.protect, userController.getMe)

//EDIT AND DELETE ROUTES
router.route('/single')
  .patch(authMiddle.protect, userController.uploadImage, userController.editUser)
  .delete(authMiddle.protect, userController.deleteUser)


//portfolio
router.route('/portfolio')
.post(authMiddle.protect,userController.createPortfolio);




//UTILS ROUTES
router.route('/sendotp')
  .post(emailController.sendOTP)

router.route('/verifyotp')
  .post(emailController.verifyOTP)

router.route('/sendsms')
  .get(smsController.sendSMS)


module.exports = router;
