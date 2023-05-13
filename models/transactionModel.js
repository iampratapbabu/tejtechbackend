const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"userId is required"]
    },
    transferredAmount:{
        type:Number
    },
    isDebit:Boolean,
    typeOfExpense:{
        type:String,
        enum:['food','fuel','clothes','electronics','rent','emi','others']
    },
    lastUpdated:{
        type:Date,
        default:Date.now()
    },

});

const Transaction = mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;
