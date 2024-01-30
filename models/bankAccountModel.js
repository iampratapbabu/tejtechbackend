const mongoose = require('mongoose');

const bankAccountSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    },
    name:{
        type:String,
        required:[true,"bank name is required"]   
    },
    accountHolderNamer:{
        type:String,
        required:[true,"account holder name is required"]   
    },
    accountNumber:{
        type:String,
        unique:true,
        required:[true,"account number is required"]   
    },
    ifscCode:{
        type:String,
        required:[true,"ifsc code is required"]
    },
    currentBalance:{
        type:Number,
        required:[true,"ifsc code is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

});

module.exports = mongoose.model('BankAccount',bankAccountSchema);