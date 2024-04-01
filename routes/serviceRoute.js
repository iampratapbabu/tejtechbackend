const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const authMiddle = require("../middlewares/authMiddle");

const router = express.Router();


router.get('/mf',authMiddle.protect,portfolioController.getPortfolioSummary);
router.get('/mf/diversification',authMiddle.protect,portfolioController.getPortfolioSummary);
router.get('/mf/calculation',authMiddle.protect,portfolioController.getPortfolioSummary);
router.get('/mf/calculation/suggest',authMiddle.protect,portfolioController.getPortfolioSummary);



router.post('/stocks',authMiddle.protect,portfolioController.getPortfolioSummary);
router.post('/stocks/suggest',authMiddle.protect,portfolioController.getPortfolioSummary);



module.exports = router;
