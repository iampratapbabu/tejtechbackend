const express = require('express');
const authMiddle = require("../middlewares/authMiddle");
const portfolioController = require('../controllers/portfolioController')

const router = express.Router();

router.route('/')
.post(authMiddle.protect,portfolioController.createPortfolio);


module.exports = router;
