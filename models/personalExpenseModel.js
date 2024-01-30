const mongoose = require('mongoose');

const personalExpenseSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]

    },
    expenseType:{
        type:String,
        default:null
    },
    remarks:{
        type:String,
        default:null
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