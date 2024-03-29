const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const BankAccount = require('../models/bankAccountModel');
const Loan = require('../models/loanModel');
const MutualFund = require('../models/mutualFundModel');
const PersonalExpense = require('../models/personalExpenseModel');
const Stock = require('../models/stockModel');
const { errorResponse, successResponse } = require('../lib/responseHandler');


const getPortfolioSummary = async(req,res) =>{
    try{
        let userPortfolioSummary = {
            "netWorth":0,
            "totalAssets":0,
            "totalLiablites":0,
            "assets":[],
            "liablities":[],
        }

        let userMutualFunds = await MutualFund.find({user:req.user._id});
        let userStocks = await Stock.find({user:req.user._id});
        let userBankAccounts = await BankAccount.find({user:req.user._id});
        let userExpenses = await PersonalExpense.find({user:req.user._id});
        let userLoans = await Loan.find({user:req.user._id});

        let totalMf=0,totalStocks = 0,totalBankBalance = 0,totalExpense = 0,totalLoans = 0;

        //calculating assests
        for(let mutualFund of userMutualFunds){
            totalMf += mutualFund?.amount;
        }

        for(let stock of userStocks){
            totalStocks += stock?.amount;
        }

        for(let bankAccount of userBankAccounts){
            totalBankBalance += bankAccount?.currentBalance;
        }

        for(let expense of userExpenses){
            totalExpense += expense?.amount;
        }

        for(let loan of userLoans){
            totalLoans += loan?.amount;
        }

        userPortfolioSummary.totalAssets = totalMf + totalBankBalance + totalStocks;
        userPortfolioSummary.totalLiablites = totalExpense + totalLoans;
        userPortfolioSummary.netWorth = (totalMf + totalBankBalance + totalStocks) - (totalExpense + totalLoans);


        return successResponse(res, 'Portfolio summary fetched', 200, userPortfolioSummary);

    }catch(err){
        errorResponse(res, 'getSinglePortfolio', 500, err);

    }
}

const createPortfolio = async (req, res) => {
    try {
        const { mutualFunds, stocks, bankAccounts, expenses, loans } = req.body;
        let userBankAccount, userMutualFund, userStock, userExpense, userLoan;

        let resBody = {};

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
      
        if (req.body.portfolioType === "mutualFunds") {
            let userMutualFunds = await MutualFund.find({user:req.user._id});
            return successResponse(res, 'mutualFunds portfolio fetched', 200, {portfolioType:"mutualFunds",userMutualFunds});
        }

        if (req.body.portfolioType === "stocks") {
            let userStocks = await Stock.find({user:req.user._id});
            return successResponse(res, 'stocks fetched', 200, {portfolioType:"stocks",userStocks});

        }

        if (req.body.portfolioType === "bankAccounts") {
            let userBankAccounts = await BankAccount.find({user:req.user._id});
            return successResponse(res, 'bank accounts fetched', 200, {portfolioType:"bankAccounts",userBankAccounts});
        }

        if (req.body.portfolioType === "expenses") {
            let userExpenses = await PersonalExpense.find({user:req.user._id});
            return successResponse(res, 'expense fetched', 200, {portfolioType:"expenses",userExpenses});

        }

        if (req.body.portfolioType === "loans") {
            let userLoans = await Loan.find({user:req.user._id});
            return successResponse(res, 'Loan Portfolio fetched', 200, {portfolioType:"loans",userLoans});

        }

        return successResponse(res, 'portfolio type not found', 200, {});

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', 500, err);

    }
}

const editPortfolio = async (req, res) => {
    try {
        const {mutualFunds,stoks,bankAccounts,expenses,loans} = req.body
        const filter = {_id:req.body.portfolioId,user:req.user._id};

        if (req.body.portfolioType === "mutualFunds") {
            let updatedMutualFunds = await MutualFund.findOneAndUpdate(filter,mutualFunds,{new:true});
            if(!updatedMutualFunds) return errorResponse(res, 'Mutual fund Not found', 400, {});
            return successResponse(res, 'mutualFunds portfolio updated successfully', 200, updatedMutualFunds);
        }

        if (req.body.portfolioType === "stocks") {
            let updatedStocks = await Stock.findOneAndUpdate(filter,stoks,{new:true});
            if(!updatedStocks) return errorResponse(res, 'Stock Not found', 400, {});
            return successResponse(res, 'mutualFunds portfolio updated successfully', 200, updatedStocks);
        }

        if (req.body.portfolioType === "bankAccounts") {
            let updatedBankAccounts = await BankAccount.findOneAndUpdate(filter,bankAccounts,{new:true});
            if(!updatedBankAccounts) return errorResponse(res, 'Bank Account Not found', 400, {});
            return successResponse(res, 'Bank Account portfolio updated successfully', 200, updatedBankAccounts);
        }

        if (req.body.portfolioType === "expenses") {
            let updatedExpenses = await PersonalExpense.findOneAndUpdate(filter,expenses,{new:true});
            if(!updatedExpenses) return errorResponse(res, 'Expense Not found', 400, {});
            return successResponse(res, 'Expense portfolio updated successfully', 200, updatedExpenses);

        }

        if (req.body.portfolioType === "loans") {
            let updatedLoans = await Loan.findOneAndUpdate(filter,loans,{new:true});
            if(!updatedLoans) return errorResponse(res, 'Loan Not found', 400, {});
            return successResponse(res, 'Loan portfolio updated successfully', 200, updatedLoans);

        }

        return successResponse(res, 'portfolio type not found', 200, {});

    } catch (err) {
        errorResponse(res, 'getSinglePortfolio', 500, err);

    }
}


module.exports = {
    createPortfolio,
    getuserPortfolio,
    editPortfolio,
    getPortfolioSummary,
}