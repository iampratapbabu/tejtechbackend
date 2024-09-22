const express = require('express');
const authMiddle = require("../middlewares/authMiddle");
const portfolioController = require('../controllers/portfolioController')

const router = express.Router();

router.route('/')
.get(authMiddle.protect,portfolioController.getPortfolioSummary)
.post(authMiddle.protect,portfolioController.createPortfolio);

router.route('/expense')
.get(authMiddle.protect,portfolioController.getExpenseSummary)

router.route('/user-portfolio')
.post(authMiddle.protect,portfolioController.getuserPortfolio);

router.route('/edit-portfolio')
.patch(authMiddle.protect,portfolioController.editPortfolio);

router.route('/single/:portfolioId')
.delete(authMiddle.protect,portfolioController.deletePortfolio)




module.exports = router;
