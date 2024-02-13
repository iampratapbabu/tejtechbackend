const express = require('express');
const userController = require('../controllers/userController');
const emailController = require('../utils/emailController');
const authMiddle = require("../middlewares/authMiddle")
const smsController = require('../utils/smsController')

const router = express.Router();

router.route('/')
.post(authMiddle.protect,userController.createPortfolio);


module.exports = router;
