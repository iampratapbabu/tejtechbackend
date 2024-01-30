const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"user is required"]
    },
    amount:{
        type:Number,
        required:[true,"amount is required"]
    },
    isDebit:{
        type:Boolean,
        default:true,
    },
    createdDate:{
        type:Date,
        default:Date.now()
    },

});

const Transaction = mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;
