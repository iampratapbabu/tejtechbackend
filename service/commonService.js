const ExpenseType = require("../models/expenseTypeModel");

exports.getAllExpenseType = async (req) => {
    try {
        const expenseTypes = await ExpenseType.find().sort('positionValue'); //ascending order
        return expenseTypes;
    } catch (err) {
        throw err;
    }

}