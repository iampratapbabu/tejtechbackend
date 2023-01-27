const mongoose = require('mongoose');

const financeSchema = mongoose.Schema({
    balance_amount:{
        type:Number
    },
    type_of_expense:{
        type:String,
        enum: ['food','travel','rent','party','lend','miscllaneous'],
        default:'miscllaneous'
    },
    lended_amount:[
        {
            amount:Number,
            name:String
        }
    ],
    transactions:[
        {
            amount:Number,
            type_of_transaction:{
                type:String,
                enum:['add','substract']
            },
            time_of_transaction:{
                type:Date,
                default:Date.now()
            }
            
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
});

const Finance = mongoose.model('Finance',financeSchema);
module.exports=Finance;
