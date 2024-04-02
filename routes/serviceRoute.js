const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const authMiddle = require("../middlewares/authMiddle");

const router = express.Router();


router.get('/mf',authMiddle.protect,portfolioController.mfPortfolio);
router.post('/mf/diversification',authMiddle.protect,portfolioController.mfDiversification);
router.post('/mf/calculation',authMiddle.protect,portfolioController.mfCalculation);
router.post('/mf/suggest',authMiddle.protect,portfolioController.mfSuggest);

router.get('/stocks',authMiddle.protect,portfolioController.stocksPortfolio);
router.post('/stocks/suggest',authMiddle.protect,portfolioController.stocksSuggest);



module.exports = router;
