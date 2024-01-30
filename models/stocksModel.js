const mongoose = require('mongoose');

const stocksSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    },
    name:{
        type:String,
        required:[true,"name is required"]
    },
    dateOfInvestment:{
        type:Date,
        default:Date.now()
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

module.exports = mongoose.model('Stocks',stocksSchema);