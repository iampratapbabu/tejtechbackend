const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const BankAccount = require('../models/bankAccountModel');
const Loan = require('../models/loanModel');
const MutualFund = require('../models/mutualFundModel');
const PersonalExpense = require('../models/personalExpenseModel');
const Stock = require('../models/stockModel');
const { errorResponse, successResponse } = require('../lib/responseHandler');
const axios = require("axios");


const getPortfolioSummary = async (req, res) => {
    try {
        let userPortfolioSummary = {
            "netWorth": 0,
            "totalAssets": 0,
            "totalLiablites": 0,
            // "assets":[],
            // "liablities":[],
        }

        let userMutualFunds = await MutualFund.find({ user: req.user._id });
        let userStocks = await Stock.find({ user: req.user._id });
        let userBankAccounts = await BankAccount.find({ user: req.user._id });
        let userExpenses = await PersonalExpense.find({ user: req.user._id });
        let userLoans = await Loan.find({ user: req.user._id });

        let totalMf = 0, totalStocks = 0, totalBankBalance = 0, totalExpense = 0, totalLoans = 0;

        //calculating assests
        for (let mutualFund of userMutualFunds) {
            totalMf += mutualFund?.amount;
        }

        for (let stock of userStocks) {
            totalStocks += stock?.amount;
        }

        for (let bankAccount of userBankAccounts) {
            totalBankBalance += bankAccount?.currentBalance;
        }

        for (let expense of userExpenses) {
            totalExpense += expense?.amount;
        }

        for (let loan of userLoans) {
            totalLoans += loan?.amount;
        }

        userPortfolioSummary.totalAssets = totalMf + totalBankBalance + totalStocks;
        userPortfolioSummary.totalLiablites = totalLoans;
        userPortfolioSummary.netWorth = (totalMf + totalBankBalance + totalStocks) - (totalLoans);


        return successResponse(res, 'Portfolio summary fetched', userPortfolioSummary);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

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

        return successResponse(res, 'portfolio created successfully', {mutualFunds, stocks, bankAccounts, expenses, loans});

    } catch (err) {
        errorResponse(res, 'createPortfolio', err);
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

        return successResponse(res, 'Portfolio summary fetched', userExpense);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

    }
}

const getuserPortfolio = async (req, res) => {
    try {

        if (req.body.portfolioType === "mutualFunds") {
            let userMutualFunds = await MutualFund.find({ user: req.user._id });
            return successResponse(res, 'mutualFunds portfolio fetched', 200, { portfolioType: "mutualFunds", userMutualFunds });
        }

        if (req.body.portfolioType === "stocks") {
            let userStocks = await Stock.find({ user: req.user._id });
            return successResponse(res, 'stocks fetched', 200, { portfolioType: "stocks", userStocks });

        }

        if (req.body.portfolioType === "bankAccounts") {
            let userBankAccounts = await BankAccount.find({ user: req.user._id });
            return successResponse(res, 'bank accounts fetched', 200, { portfolioType: "bankAccounts", userBankAccounts });
        }

        if (req.body.portfolioType === "expenses") {
            let userExpenses = await PersonalExpense.find({ user: req.user._id });
            return successResponse(res, 'expense fetched', 200, { portfolioType: "expenses", userExpenses });

        }

        if (req.body.portfolioType === "loans") {
            let userLoans = await Loan.find({ user: req.user._id });
            return successResponse(res, 'Loan Portfolio fetched', 200, { portfolioType: "loans", userLoans });

        }

        return successResponse(res, 'portfolio type not found', 200, {});

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', 500, err);

    }
}

const editPortfolio = async (req, res) => {
    try {
        const { mutualFunds, stocks, bankAccounts, expenses, loans } = req.body
        const filter = { _id: req.body.portfolioId, user: req.user._id };

        if (mutualFunds) {
            let updatedMutualFunds = await MutualFund.findOneAndUpdate(filter, mutualFunds, { new: true });
            if (!updatedMutualFunds) throw new CustomError("portfolio error",400,"mutual fund not found") 
            return successResponse(res, 'mutualFunds portfolio updated successfully', updatedMutualFunds);
        }

        if (stocks) {
            let updatedStocks = await Stock.findOneAndUpdate(filter, stocks, { new: true });
            if (!updatedStocks) throw new CustomError("auth Error",400,"stock not found") 
            return successResponse(res, 'mutualFunds portfolio updated successfully', updatedStocks);
        }

        if (bankAccounts) {
            let updatedBankAccounts = await BankAccount.findOneAndUpdate(filter, bankAccounts, { new: true });
            if (!updatedBankAccounts) throw new CustomError("auth Error",400,"bank account not found") 
            return successResponse(res, 'Bank Account portfolio updated successfully', updatedBankAccounts);
        }

        if (expenses) {
            let updatedExpenses = await PersonalExpense.findOneAndUpdate(filter, expenses, { new: true });
            if (!updatedExpenses) throw new CustomError("auth Error",400,"expense not found") 
            return successResponse(res, 'Expense portfolio updated successfully', updatedExpenses);

        }

        if (loans) {
            let updatedLoans = await Loan.findOneAndUpdate(filter, loans, { new: true });
            if (!updatedLoans) throw new CustomError("auth Error",400,"loan not found") 
            return successResponse(res, 'Loan portfolio updated successfully', updatedLoans);

        }

        return successResponse(res, 'portfolio type not found', {});

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

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
        errorResponse(res, 'getSinglePortfolio', err);

    }
}

const mfDiversification = async (req, res) => {
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

        return successResponse(res, 'Portfolio summary fetched', userExpense);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

    }
}

const mfCalculation = async (req, res) => {
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

        return successResponse(res, 'Portfolio summary fetched', userExpense);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

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

        return successResponse(res, 'mutual fund suggestions fetched', 200, response.data);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

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

        return successResponse(res, 'Stocks summary fetched', stocksDetail);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

    }
}

const stocksSuggest = async (req, res) => {
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

        return successResponse(res, 'Portfolio summary fetched', userExpense);

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', err);

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