const express = require('express');
const financeController = require('../controllers/financeController');

const router = express.Router();

router.route('/')
.get(financeController.getAll);

router.route('/:id')
.get(financeController.getMyFinance)
.post(financeController.createMyFinance)
.patch(financeController.updateMyFinance);

router.route('/status/:id')
.get(financeController.myFinanceInfo)




module.exports = router;