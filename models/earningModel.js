const mongoose = require('mongoose');

const earningSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:String,
        required:[true,"amount is required"]   
    },
    earningType:{
        type:String,
    },
    earningDate:{
        type:Date,
        default:Date.now()
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

});

module.exports = mongoose.model('Earning',earningSchema);