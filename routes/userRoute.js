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
  .post(authMiddle.protect, userController.setExpense)
  .delete(authMiddle.protect, userController.deleteUser)


//UTILS ROUTES
router.route('/sendotp')
  .post(emailController.sendOTP)

router.route('/verifyotp')
  .post(emailController.verifyOTP)

router.route('/sendsms')
  .get(smsController.sendSMS)

//TRANSACTIONS
router.route('/transactions')
  .get(authMiddle.protect, userController.getAllTransactions)
  .post(authMiddle.protect, userController.createTransaction)

module.exports = router;
