const express = require('express');
const transactionController = require('../controllers/transactionController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
    .get(userController.protect, transactionController.getAllTransactions)
    .post(userController.protect, transactionController.createTransaction)

module.exports = router;