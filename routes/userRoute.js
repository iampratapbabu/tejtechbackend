const express = require('express');
const userController = require('../controllers/userController');
const emailController = require('../controllers/emailController')

const router = express.Router();

  router.route('/')
	.get(userController.getAllUsers)

  router.route('/signup')
  .post(userController.signup);

  router.route('/login')
  .post(userController.loginUser);

  router.route('/protect')
  .get(userController.protect,userController.getMe)

  router.route('/sendotp/:id')
  .get(emailController.sendOTP);



module.exports = router;
