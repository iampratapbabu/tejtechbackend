const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:[true,"amount is required"]   
    },
    loanType:{
        type:String,
        default:"given",
        enum:['taken','given']
    },
    remarks:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:null
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