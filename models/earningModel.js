const mongoose = require('mongoose');

const earningSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]

    },
    amount:{
        type:String,
        required:[true,"amount is required"]   
    },
    earningType:{
        type:String,
        default:"salary",
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