const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:String,
        required:[true,"amount is required"]   
    },
    loanType:{
        type:String,
        enum:['taken','given']
    },
    remarks:{
        type:String,
    },
    loanDate:{
        type:Date,
        default:Date.now()
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

});

module.exports = mongoose.model('Loan',loanSchema);