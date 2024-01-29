const mongoose = require('mongoose');

const personalExpenseSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    expenseType:{
        type:String,
    },
    remarks:{
        type:String,
    },
    amount:{
        type:Number,
        required:[true,"amount Invested is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

});

module.exports = mongoose.model('PersonalExpense',personalExpenseSchema);