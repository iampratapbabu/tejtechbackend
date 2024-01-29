const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"userId is required"]
    },
    amount:{
        type:Number
    },
    isDebit:Boolean,
    createdDate:{
        type:Date,
        default:Date.now()
    },

});

const Transaction = mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;
