const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const BankAccount = require('../models/bankAccountModel');
const Loan = require('../models/loanModel');
const MutualFund = require('../models/mutualFundModel');
const PersonalExpense = require('../models/personalExpenseModel');
const Stock = require('../models/stockModel');
const { errorResponse, successResponse } = require('../lib/responseHandler');
const axios = require("axios");
const { userPortfolioSummary } = require('../service/userPortfolioService');
const CustomError = require('../lib/customError');

const getPortfolioSummary = async (req, res) => {
    try {
        const userPortfolio = await userPortfolioSummary(req);
        return successResponse(res, 'Portfolio summary fetched', userPortfolio);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const createPortfolio = async (req, res) => {
    try {
        const { mutualFunds, stocks, bankAccounts, expenses, loans } = req.body;
        let userBankAccount, userMutualFund, userStock, userExpense, userLoan;

        let resBody = {};

        //saving bank accounts
        if (bankAccounts) {
            userBankAccount = await BankAccount.create({ ...bankAccounts, user: req.user._id });
        }

        //saving mfs
        if (mutualFunds) {
            userMutualFund = await MutualFund.create({ ...mutualFunds, user: req.user._id });
        }

        //saving stocks
        if (stocks) {
            userStock = await Stock.create({ ...stocks, user: req.user._id });
        }

        //saving expenses
        if (expenses) {
            userExpense = await PersonalExpense.create({ ...expenses, user: req.user._id });
        }

        //saving loans
        if (loans) {
            userLoan = await Loan.create({ ...loans, user: req.user._id });
        }

        return successResponse(res, 'Portfolio Created Successfully', { mutualFunds, stocks, bankAccounts, expenses, loans });

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);
    }
}

const getExpenseSummary = async (req, res) => {
    try {
        let userExpense = {
            "expenseAmount": 0,
            // "assets":[],
            // "liablities":[],
        }

        let userExpenses = await PersonalExpense.find({ user: req.user._id });
        let totalExpense = 0;

        for (let expense of userExpenses) {
            totalExpense += expense?.amount;
        }

        userExpense.expenseAmount = totalExpense

        return successResponse(res, 'Expense Summary Fetched', userExpense);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const getuserPortfolio = async (req, res) => {
    try {
        const { portfolioType } = req.body;
        let portfolio;
        switch (portfolioType) {
            case "mutualFunds":
                portfolio = await MutualFund.find({ user: req.user._id });
                break;
            case "stocks":
                portfolio = await Stock.find({ user: req.user._id });
                break;
            case "bankAccounts":
                portfolio = await BankAccount.find({ user: req.user._id });
                break;
            case "expenses":
                portfolio = await PersonalExpense.find({ user: req.user._id });
                break;
            case "loans":
                portfolio = await Loan.find({ user: req.user._id });
                break;
            default:
                portfolio = null;
        }
        if(portfolio == null){
            throw new CustomError("portfolio_error",400,"Portfolio Detail Not Found");
        }
        return successResponse(res, 'Portfolio Fetched Successfully', portfolio);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const editPortfolio = async (req, res) => {
    try {
        const { mutualFunds, stocks, bankAccounts, expenses, loans } = req.body
        const filter = { _id: req.body.portfolioId, user: req.user._id };

        if (mutualFunds) {
            let updatedMutualFunds = await MutualFund.findOneAndUpdate(filter, mutualFunds, { new: true });
            if (!updatedMutualFunds) throw new CustomError("portfolio error", 400, "mutual fund not found")
            return successResponse(res, 'mutualFunds portfolio updated successfully', updatedMutualFunds);
        }
        if (stocks) {
            let updatedStocks = await Stock.findOneAndUpdate(filter, stocks, { new: true });
            if (!updatedStocks) throw new CustomError("auth Error", 400, "stock not found")
            return successResponse(res, 'mutualFunds portfolio updated successfully', updatedStocks);
        }
        if (bankAccounts) {
            let updatedBankAccounts = await BankAccount.findOneAndUpdate(filter, bankAccounts, { new: true });
            if (!updatedBankAccounts) throw new CustomError("auth Error", 400, "bank account not found")
            return successResponse(res, 'Bank Account portfolio updated successfully', updatedBankAccounts);
        }
        if (expenses) {
            let updatedExpenses = await PersonalExpense.findOneAndUpdate(filter, expenses, { new: true });
            if (!updatedExpenses) throw new CustomError("auth Error", 400, "expense not found")
            return successResponse(res, 'Expense portfolio updated successfully', updatedExpenses);
        }
        if (loans) {
            let updatedLoans = await Loan.findOneAndUpdate(filter, loans, { new: true });
            if (!updatedLoans) throw new CustomError("auth Error", 400, "loan not found")
            return successResponse(res, 'Loan portfolio updated successfully', updatedLoans);

        }
        return successResponse(res, 'portfolio type not found', {});

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

//mfservice

const mfPortfolio = async (req, res) => {
    try {
        let successObject = {
            totalMf: 0,
            sip: 0,
            totalAmount: 0,
            investedAmount: 0,
            returnAmount: 0,
        }

        const mf = await MutualFund.find({ user: req.user._id });
        let userId = req.user.id;
        const mfDetail = await MutualFund.aggregate(
            [
                {
                    $match: { user: req.user._id }
                },
                {
                    $group: {
                        _id: { user: "$user" },
                        totalAmount: { $sum: "$amount" },
                        totalMf: { $sum: 1 },
                        // totalSip: {
                        //     $sum: {
                        //       $cond: [{ $in: ["$investmentType", "sip"] }, 1, 0]
                        //     }
                        // },
                        // totalLumpsump: {
                        //     $sum: {
                        //       $cond: [{ $in: ["$investmentType", "lumpsump"] }, 1, 0]
                        //     }
                        // }
                    }
                }
            ]
        )

        return successResponse(res, 'MF summary fetched', mfDetail);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const mfDiversification = async (req, res) => {
    try {
        return successResponse(res, 'Portfolio summary fetched', userExpense);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const mfCalculation = async (req, res) => {
    try {
        return successResponse(res, 'Portfolio Summary Fetched', userExpense);
    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const mfSuggest = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://top-performing-mutual-funds.p.rapidapi.com/feed_mf_promotion.cms',
            params: { feedtype: 'json' },
            headers: {
                'X-RapidAPI-Key': '180602f77bmshd0d349914134215p1d51fdjsnb37e99f4cbac',
                'X-RapidAPI-Host': 'top-performing-mutual-funds.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        //console.log(response.data);

        return successResponse(res, 'Mutual Fund Suggestion Fetched', response.data);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}


//stocks service
const stocksPortfolio = async (req, res) => {
    try {
        const stocksDetail = await Stock.aggregate(
            [
                {
                    $match: { user: req.user._id }
                },
                {
                    $group: {
                        _id: { user: "$user" },
                        totalAmount: { $sum: "$amount" },
                        totalStocks: { $sum: 1 },
                    }
                }
            ]
        )
        return successResponse(res, 'Stocks Summary Fetched', stocksDetail);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const stocksSuggest = async (req, res) => {
    try {
        return successResponse(res, 'Stock Suggestion Success', userExpense);

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}


module.exports = {
    createPortfolio,
    getuserPortfolio,
    getExpenseSummary,
    editPortfolio,
    getPortfolioSummary,

    mfPortfolio,
    mfDiversification,
    mfCalculation,
    mfSuggest,

    stocksPortfolio,
    stocksSuggest,
}