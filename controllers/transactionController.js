const Transaction = require('../models/transactionModel');
const User = require('../models/userModel')
const {errorResponse,successResponse} = require('../lib/responseHandler');


const getAllTransactions = async(req,res) =>{
    try{
        console.log(req.user);
        let transactions = await Transaction.find({userid:req.user._id});
        if(!transactions){return  errorResponse(res,"no transactions found",404,null);}
        successResponse(res,"all transactions fetched",200,{totalTransactions:transactions.length,transactions})
    }catch(err){
        errorResponse(res,"getAllTransactions",500,err);
    }
}

const createTransaction = async(req,res) =>{
    try{
        const {transferredAmount,typeOfExpense} = req.body;
       
        let transaction = new Transaction({
            userid:req.user._id,
            transferredAmount,
            isDebit:true,
            typeOfExpense
        })
        await transaction.save();
        let user = await User.findById(req.user._id);
        let amount = parseInt(transferredAmount)+user.totalExpense;
        await User.updateOne({_id:req.user._id},{
            totalExpense:amount
        })
        successResponse(res,"transaction created",201,transaction)
    }catch(err){
        errorResponse(res,"createTransaction",500,err);
    }
}



module.exports={getAllTransactions,createTransaction};