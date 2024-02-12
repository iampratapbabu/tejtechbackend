const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    },
    name:{
        type:String,
        required:[true,"name is required"]
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

module.exports = mongoose.model('Stock',stockSchema);