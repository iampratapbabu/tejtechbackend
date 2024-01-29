const mongoose = require('mongoose');

const stocksSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
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