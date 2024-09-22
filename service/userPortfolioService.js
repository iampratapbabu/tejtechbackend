const BankAccount = require('../models/bankAccountModel');
const Loan = require('../models/loanModel');
const MutualFund = require('../models/mutualFundModel');
const PersonalExpense = require('../models/personalExpenseModel');
const Stock = require('../models/stockModel');


exports.userPortfolioSummary = async (req) => {
    try {
        let userPortfolioSummary = {
            "netWorth": 0,
            "totalAssets": 0,
            "totalLiablites": 0,
            // "assets":[],
            // "liablities":[],
        }

        console.log(req.user);
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

        return userPortfolioSummary;

    } catch (err) {
        throw err;
    }

}