const mongoose = require('mongoose');

const financeSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    transferredAmount:{
        type:Number
    },
    isDebit:Boolean,
    type_of_expense:{
        type:String,
        enum:['food','fuel','clothes','electronics','rent','emi']
    },
    last_updated:{
        type:Date,
        default:Date.now()
    },

});

const Finance = mongoose.model('Finance',financeSchema);
module.exports=Finance;
