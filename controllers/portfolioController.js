const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const BankAccount = require('../models/bankAccountModel');
const Earning = require('../models/earningModel');
const Loan = require('../models/loanModel');
const MutualFund = require('../models/mutualFundModel');
const PersonalExpense = require('../models/personalExpenseModel');
const Stock = require('../models/stockModel');

const { errorResponse, successResponse } = require('../lib/responseHandler');

const createPortfolio = async (req, res) => {
    try {
        const { mutualFunds, stocks, bankAccounts, earnings, expenses, loans } = req.body;
        let userBankAccount, userMutualFund, userStock, userEarning, userExpense, userLoan;

        //saving bank accounts
        if (bankAccounts && bankAccounts.length > 0) {
            for (let singleAccount of bankAccounts) {
                userBankAccount = await BankAccount.create({ ...singleAccount, user: req.user._id });
            }
        }

        //saving mfs
        if (mutualFunds && mutualFunds.length > 0) {
            for (let singlemf of mutualFunds) {
                userMutualFund = await MutualFund.create({ ...singlemf, user: req.user._id });
            }
        }

        //saving stocks
        if (stocks && stocks.length > 0) {
            for (let singleStock of stocks) {
                userStock = await Stock.create({ ...singleStock, user: req.user._id });
            }
        }

        //saving earnings
        if (earnings && earnings.length > 0) {
            for (let singleEarning of earnings) {
                userEarning = await Earning.create({ ...singleEarning, user: req.user._id });
            }
        }

        //saving expenses
        if (expenses && expenses.length > 0) {
            for (let singleExpense of expenses) {
                userExpense = await Loan.create({ ...singleExpense, user: req.user._id });
            }
        }

        //saving loans
        if (loans && loans.length > 0) {
            for (let singleLoan of loans) {
                userLoan = await Loan.create({ ...singleLoan, user: req.user._id });
            }
        }

        return successResponse(res, 'portfolio creation successfull', 200, {});

    } catch (err) {
        errorResponse(res, 'createPortfolio', 500, err);
    }
}

const getuserPortfolio = async (req, res) => {
    try {
        const { portfolioType } = req.body;
        let responseBody = {};
        //summary, mutualFunds,stocks,bankAccounts,earnings,expenses,loans
        if (portfolioType === "summary") {

        }


    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', 500, err);

    }
}


const editPortfolio = async (req, res) => {
    try {
        const { portfolioId } = req.body;

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', 500, err);

    }
}


module.exports = {
    createPortfolio,
    getuserPortfolio,
    editPortfolio
}