const express = require('express');
const authMiddle = require("../middlewares/authMiddle");
const portfolioController = require('../controllers/portfolioController')

const router = express.Router();

router.route('/')
.post(authMiddle.protect,portfolioController.createPortfolio);

router.route('/user-portfolio')
.post(authMiddle.protect,portfolioController.getuserPortfolio);

router.route('/edit-portfolio')
.patch(authMiddle.protect,portfolioController.editPortfolio);


module.exports = router;
