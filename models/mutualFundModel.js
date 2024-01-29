const mongoose = require('mongoose');

const mutualFundSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"mutual fund name is required"]   
    },
    amount:{
        type:Number,
        required:[true,"amount Invested is required"]
    },
    dateOfInvestment:{
        type:Date,
        default:Date.now()
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

});

module.exports = mongoose.model('MutualFund',mutualFundSchema);