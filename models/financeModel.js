const mongoose = require('mongoose');

const financeSchema = mongoose.Schema({
    balance_amount:{
        type:Number
    },      
    spent_amount:Number,
    add_amount:Number,
    transactions:[
        {
            amount:Number,
            type_of_expense:{
                type:String,
                enum: ['food','travel','rent','party','lend','miscllaneous','added_amount'],
                default:'miscllaneous'
            },
            time_of_transaction:{
                type:Date,
                default:Date.now()
            }
            
        }
    ],
    last_updated:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
});

const Finance = mongoose.model('Finance',financeSchema);
module.exports=Finance;
