const { errorResponse, successResponse } = require('../lib/responseHandler');
const ExpenseType = require('../models/expenseTypeModel');
const { getAllExpenseType } = require('../service/commonService');

const fetchAllExpenseType = async (req, res) => {
    try {
        const allExpenseTypes = await getAllExpenseType();
        successResponse(res, 'Successfully Fetched All Expenses Types', allExpenseTypes);
    } catch (err) {
        errorResponse(res, 'expenseType_error', err);
    }
}

const createExpenseType = async (req, res) => {
    try {
        let newExpenseType;
        const { name, value, positionValue } = req.body;

        const isPositionOccupied = await ExpenseType.findOne({ positionValue });
        if (isPositionOccupied) {
            let existingPositions = await ExpenseType.find(
                {
                    positionValue: {
                        $gte: positionValue
                    }
                }

            );

            console.log(existingPositions);

            for (let singleExistingPosition of existingPositions) {
                let newPosition = singleExistingPosition.positionValue + 1;
                console.log(newPosition);
                await ExpenseType.findByIdAndUpdate(singleExistingPosition._id, { positionValue: newPosition }, { new: true })
            }


        }
        newExpenseType = await ExpenseType.create({
            name,
            value,
            positionValue
        });
        successResponse(res, 'Expense Type Created', newExpenseType);


    } catch (err) {
        errorResponse(res, 'expenseType_error', err);
    }
}





module.exports = {
    fetchAllExpenseType,
    createExpenseType
}