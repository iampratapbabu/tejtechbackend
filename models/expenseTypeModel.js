const mongoose = require('mongoose');

const expenseTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    value: {
        type: String,
        unique: true
    },
    positionValue: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},

);

const ExpenseType = mongoose.model('ExpenseType', expenseTypeSchema);

module.exports = ExpenseType;
