const BankAccount = require('../models/bankAccountModel');
const Loan = require('../models/loanModel');
const MutualFund = require('../models/mutualFundModel');
const PersonalExpense = require('../models/personalExpenseModel');
const Stock = require('../models/stockModel');


exports.userPortfolioSummary = async (req) => {
    try {
        let userPortfolioSummary = {
            netWorth: 0,
            totalAssets: 0,
            totalLiablites: 0,
            userAssests: [
                {
                    assetType: "Savings Account",
                    assetValue: 0,
                    assetDate: ""
                },
                {
                    assetType: "Mutual Funds",
                    assetValue: 0,
                    assetDate: ""
                },
                {
                    assetType: "Stocks",
                    assetValue: 0,
                    assetDate: ""
                }
            ],
            userLoans: [],
            userExpenses: [],
        }

        console.log(req.user);
        let userMutualFunds = await MutualFund.find({ user: req.user._id });
        let userStocks = await Stock.find({ user: req.user._id });
        let userBankAccounts = await BankAccount.find({ user: req.user._id });
        let userExpenses = await PersonalExpense.find({ user: req.user._id }).sort('-createdAt');
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

        const totalAssestsValue = totalMf + totalBankBalance + totalStocks;
        const totalLiablitesValue = totalLoans + totalExpense;
        const netWorthValue = totalAssestsValue - totalLiablitesValue;

        userPortfolioSummary.totalAssets = totalAssestsValue;
        userPortfolioSummary.totalLiablites = totalLiablitesValue;
        userPortfolioSummary.netWorth = netWorthValue;

        for (let i = 0; i < userPortfolioSummary.userAssests.length; i++) {
            if (userPortfolioSummary.userAssests[i].assetType === "Savings Account") {
                userPortfolioSummary.userAssests[i].assetValue = totalBankBalance;
                    userPortfolioSummary.userAssests[i].assetDate = new Date();
            }
            if (userPortfolioSummary.userAssests[i].assetType === "Mutual Funds") {
                userPortfolioSummary.userAssests[i].assetValue = totalMf;
                    userPortfolioSummary.userAssests[i].assetDate = new Date();
            }
            if (userPortfolioSummary.userAssests[i].assetType === "Stocks") {
                userPortfolioSummary.userAssests[i].assetValue = totalStocks;
                    userPortfolioSummary.userAssests[i].assetDate = new Date();
            }
        }

        userPortfolioSummary.userLoans = userLoans;
        userPortfolioSummary.userExpenses = userExpenses;



        return userPortfolioSummary;

    } catch (err) {
        throw err;
    }

}