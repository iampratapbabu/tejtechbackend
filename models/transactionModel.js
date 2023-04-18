const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    transferredAmount:{
        type:Number
    },
    isDebit:Boolean,
    typeOfExpense:{
        type:String,
        enum:['food','fuel','clothes','electronics','rent','emi']
    },
    lastUpdated:{
        type:Date,
        default:Date.now()
    },

});

const Transaction = mongoose.model('Finance',transactionSchema);
module.exports=Transaction;
