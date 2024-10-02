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
const { mongoose } = require('mongoose');
const { ObjectId } = mongoose.Types;


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
        const { portfolioType } = req.query;
        console.log(portfolioType);

        const { mutualFunds, stocks, bankAccounts, expenses, loans } = req.body;
        let resBody = {};

        switch (portfolioType) {
            case "mutualFunds":
                let userMutualFunds = await MutualFund.create({ ...mutualFunds, user: req.user._id });
                resBody.message = "Mutual Funds Added Successfully";
                resBody.data = userMutualFunds;
                break;
            case "stocks":
                let userStock = await Stock.create({ ...stocks, user: req.user._id });
                resBody.message = "Stock Added Successfully";
                resBody.data = userStock;
                break;
            case "bankAccounts":
                let userBankAccount = await BankAccount.create({ ...bankAccounts, user: req.user._id });
                resBody.message = "Bank Account Added Successfully";
                resBody.data = userBankAccount;
                break;
            case "expenses":
                let userExpense = await PersonalExpense.create({ ...expenses, user: req.user._id });
                resBody.message = "Expense Added Successfully";
                resBody.data = userExpense;
                break;
            case "loans":
                let userLoan = await Loan.create({ ...loans, user: req.user._id });
                resBody.message = "Loan Added Successfully";
                resBody.data = userLoan;
                break;
            default:
                break;
        }
        return successResponse(res, resBody.message, resBody.data);

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
        const userId = req.user._id;
        let resBody = {};
        let mongoRes, mongoResMonth, mongoResYear, investedAmount, returnPercent, returnAmount, currentAmount;

        //date operations
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Create a date object for the first day of the next month
        const nextMonth = new Date(currentYear, currentMonth + 1, 1);

        // Subtract one day to get the last day of the current month
        const lastDayOfCurrentMonth = new Date(nextMonth - 1);
        const daysInCurrentMonth = lastDayOfCurrentMonth.getDate(); // Get the day (last day of the current month)

        // console.log(daysInCurrentMonth); 
        // console.log("greater than data",new Date(currentYear, currentMonth-1, 1),)
        // console.log("less than date",new Date(currentYear, currentMonth-1,daysInCurrentMonth+1) );

        const userPortfolio = await userPortfolioSummary(req);
        switch (portfolioType) {
            case "mutualFunds":
                resBody.portfolio = await MutualFund.find({ user: userId });
                mongoRes = await MutualFund.aggregate([
                    {
                        $match: { user: new ObjectId(userId) } // Filter documents with user id
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                investedAmount = mongoRes[0] ? mongoRes[0].totalAmount : 0;

                returnPercent = 0.15;
                returnAmount = returnPercent * investedAmount;
                currentAmount = returnAmount + investedAmount;
                resBody.message = "Mutual Funds Fetched Successfully";
                resBody["portfolioSummary"] = {
                    obj1: {
                        label: "Current",
                        value: currentAmount
                    },
                    obj2: {
                        label: "Returns",
                        value: returnAmount
                    },
                    obj3: {
                        label: "Invested",
                        value: investedAmount,
                    },
                    obj4: {
                        label: "Return(%)",
                        value: parseFloat(returnPercent * 100).toFixed(2)
                    }
                }
                break;
            case "stocks":
                resBody.portfolio = await Stock.find({ user: req.user._id });
                mongoRes = await Stock.aggregate([
                    {
                        $match: { user: new ObjectId(userId) } // Filter documents with user id
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                investedAmount = mongoRes[0] ? mongoRes[0].totalAmount : 0;

                returnPercent = 0.25;
                returnAmount = returnPercent * investedAmount;
                currentAmount = returnAmount + investedAmount;
                resBody.message = "Stocks Fetched Successfully";
                resBody["portfolioSummary"] = {
                    obj1: {
                        label: "Current",
                        value: currentAmount
                    },
                    obj2: {
                        label: "Returns",
                        value: returnAmount
                    },
                    obj3: {
                        label: "Invested",
                        value: investedAmount
                    },
                    obj4: {
                        label: "Return(%)",
                        value: parseFloat(returnPercent * 100).toFixed(2)
                    }
                }

                break;
            case "bankAccounts":
                resBody.portfolio = await BankAccount.find({ user: userId });
                mongoRes = await BankAccount.aggregate([
                    {
                        $match: { user: new ObjectId(userId) } // Filter documents with user id
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$currentBalance" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                investedAmount = mongoRes[0] ? mongoRes[0].totalAmount : 0;


                returnPercent = 0.079;
                returnAmount = returnPercent * investedAmount;
                currentAmount = returnAmount + investedAmount;
                resBody.message = "Bank Accounts Fetched Successfully";
                resBody["portfolioSummary"] = {
                    obj1: {
                        label: "Current Balance",
                        value: currentAmount
                    },
                    obj2: {
                        label: "Returns",
                        value: returnAmount
                    },
                    obj3: {
                        label: "Balance",
                        value: investedAmount
                    },
                    obj4: {
                        label: "Return(%)",
                        value: parseFloat(returnPercent * 100).toFixed(2)
                    }
                }


                break;
            case "expenses":
                resBody.portfolio = await PersonalExpense.find({ user: req.user._id });

                mongoRes = await PersonalExpense.aggregate([
                    {
                        $match: { user: new ObjectId(userId) } // Filter documents with user id
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                mongoResMonth = await PersonalExpense.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId), // Filter documents with user id
                            createdAt: {
                                $gte: new Date(currentYear, currentMonth-1, 1), // Start of the month
                                $lt: new Date(currentYear, currentMonth-1,daysInCurrentMonth+1)   // End of month
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);


                mongoResYear = await PersonalExpense.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId), // Filter documents with user id
                            createdAt: {
                                $gte: new Date(currentYear,0,1), // Start of the year
                                $lt: new Date(currentYear,11,31)   // end of year
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                const totalExpenseAmount = mongoRes[0] ? mongoRes[0].totalAmount : 0;
                const totalExpenseAmountInMonth = mongoResMonth[0] ? mongoResMonth[0].totalAmount : 0;
                const totalExpenseAmountInYear = mongoResYear[0] ? mongoResYear[0].totalAmount : 0;

                const percentOfNetworth = (totalExpenseAmount / userPortfolio.totalAssets) * 100;

                resBody.message = "Expenses Fetched Successfully";
                resBody["portfolioSummary"] = {
                    obj1: {
                        label: "Total Expense",
                        value: totalExpenseAmount
                    },
                    obj2: {
                        label: "This Month",
                        value: totalExpenseAmountInMonth
                    },
                    obj3: {
                        label: "This Year",
                        value: totalExpenseAmountInYear
                    },
                    obj4: {
                        label: "% of NW",
                        value: parseFloat(percentOfNetworth).toFixed(2)
                    }
                }

                break;
            case "loans":
                resBody.portfolio = await Loan.find({ user: req.user._id });
                resBody.message = "Loans Fetched Successfully";
                const loanResTaken = await Loan.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId),
                            loanType: "taken"
                        } // Filter documents with user id
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                const loanResGiven = await Loan.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId),
                            loanType: "given"
                        } // Filter documents with user id
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" } // Calculate the sum of 'amount'
                        },
                    }
                ]);

                const loanTaken = loanResTaken[0] ? loanResTaken[0].totalAmount : 0;
                const loanGiven = loanResGiven[0] ? loanResGiven[0].totalAmount : 0;
                const netDiff = loanGiven - loanTaken;

                returnAmount = returnPercent * investedAmount;
                currentAmount = returnAmount + investedAmount;

                resBody["portfolioSummary"] = {
                    obj1: {
                        label: "Loan Taken",
                        value: loanTaken
                    },
                    obj2: {
                        label: "Loan Given",
                        value: loanGiven
                    },
                    obj3: {
                        label: "Net Difference",
                        value: netDiff
                    },
                    obj4: {
                        label: "Overall",
                        value: netDiff > 0 ? "Positive" : "Negative"
                    }
                }

                break;
            default:
                resBody.portfolio = null;
        }
        if (resBody.portfolio == null) {
            throw new CustomError("portfolio_error", 400, "Portfolio Detail Not Found");
        }
        return successResponse(res, resBody.message,
            {
                portfolioSummary: resBody["portfolioSummary"],
                portfolio: resBody.portfolio,
            }
        );

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const editPortfolio = async (req, res) => {
    try {
        const { mutualFunds, stocks, bankAccounts, expenses, loans } = req.body

        if (mutualFunds) {
            const filter = { _id: req.body.mutualFunds._id, user: req.user._id };

            let updatedMutualFunds = await MutualFund.findOneAndUpdate(filter, mutualFunds, { new: true });
            if (!updatedMutualFunds) throw new CustomError("portfolio error", 400, "mutual fund not found")
            return successResponse(res, 'Mutual Funds portfolio updated successfully', updatedMutualFunds);
        }
        if (stocks) {
            const filter = { _id: req.body.stocks._id, user: req.user._id };

            let updatedStocks = await Stock.findOneAndUpdate(filter, stocks, { new: true });
            if (!updatedStocks) throw new CustomError("auth Error", 400, "stock not found")
            return successResponse(res, 'Stocks portfolio updated successfully', updatedStocks);
        }
        if (bankAccounts) {
            const filter = { _id: req.body.bankAccounts._id, user: req.user._id };

            let updatedBankAccounts = await BankAccount.findOneAndUpdate(filter, bankAccounts, { new: true });
            if (!updatedBankAccounts) throw new CustomError("auth Error", 400, "bank account not found")
            return successResponse(res, 'Bank Account portfolio updated successfully', updatedBankAccounts);
        }
        if (expenses) {
            const filter = { _id: req.body.expenses._id, user: req.user._id };

            let updatedExpenses = await PersonalExpense.findOneAndUpdate(filter, expenses, { new: true });
            if (!updatedExpenses) throw new CustomError("auth Error", 400, "expense not found")
            return successResponse(res, 'Expense portfolio updated successfully', updatedExpenses);
        }
        if (loans) {
            const filter = { _id: req.body.loans._id, user: req.user._id };

            let updatedLoans = await Loan.findOneAndUpdate(filter, loans, { new: true });
            if (!updatedLoans) throw new CustomError("auth Error", 400, "loan not found")
            return successResponse(res, 'Loan portfolio updated successfully', updatedLoans);

        }
        return successResponse(res, 'portfolio type not found', {});

    } catch (err) {
        errorResponse(res, 'portfolio_error', err);

    }
}

const deletePortfolio = async (req, res) => {
    try {
        const { portfolioType } = req.query;
        const { portfolioId } = req.params;


        let resBody = {};

        switch (portfolioType) {
            case "mutualFunds":
                let userMutualFunds = await MutualFund.findByIdAndDelete(portfolioId);
                resBody.message = "Mutual Funds Deleted Successfully";
                resBody.data = userMutualFunds;
                break;
            case "stocks":
                let userStock = await Stock.findByIdAndDelete(portfolioId);
                console.log(portfolioId);
                resBody.message = "Stock Deleted Successfully";
                resBody.data = userStock;
                break;
            case "bankAccounts":
                let userBankAccount = await BankAccount.findByIdAndDelete(portfolioId);
                resBody.message = "Bank Account Deletd Successfully";
                resBody.data = userBankAccount;
                break;
            case "expenses":
                let userExpense = await PersonalExpense.findByIdAndDelete(portfolioId);
                resBody.message = "Expense Deleted Successfully";
                resBody.data = userExpense;
                break;
            case "loans":
                let userLoan = await Loan.findByIdAndDelete(portfolioId);
                resBody.message = "Loan Deleted Successfully";
                resBody.data = userLoan;
                break;
            default:
                break;
        }
        return successResponse(res, resBody.message, resBody.data);

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
    deletePortfolio,
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