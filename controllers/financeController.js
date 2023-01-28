const Finance = require('../models/financeModel');

const getAll = async(req,res) =>{
    try{
        const finance = await Finance.find();
        res.status(200).json({
            status:"success",
            finance
        })        

    }catch(err){
        res.status(500).json({
            error: "manual error message[SERVER ERROR]",
            errormsg: err.message
        });
    }
}

const createMyFinance = async(req,res) =>{
    try{
        const {amount} = req.body;
        const finance = new Finance({
            balance_amount:amount,
            user:req.params.id
        });
        await finance.save();
        res.status(200).json({
            status:"success",
            finance
        })        

    }catch(err){
        res.status(500).json({
            error: "manual error message[SERVER ERROR]",
            errormsg: err.message
        });
    }
}

const getMyFinance = async(req,res) =>{
    try{
        const finance = await Finance.findOne({user:req.params.id}).populate('user');
        if(!finance){
            return res.status(400).json({
                status:"Failure",
                msg:"No Finance Record found for this user"
            })
        }
        res.status(200).json({
            status:"success",
            finance
        })        

    }catch(err){
        res.status(500).json({
            error: "manual error message[SERVER ERROR]",
            errormsg: err.message
        });
    }
}

const updateMyFinance = async(req,res) =>{
    try{
        const {add_amount,spent_amount} = req.body;
        console.log(add_amount,spent_amount);
        const finance = await Finance.findOne({user:req.params.id});
        if(spent_amount){
            finance.balance_amount = finance.balance_amount-spent_amount.amount;
            let transaction = {
                amount:spent_amount.amount,
                type_of_expense:spent_amount.type_of_spend
            }
            finance.transactions.push(transaction);

        }
        if(add_amount){
            finance.balance_amount = finance.balance_amount+add_amount;
            let transaction = {
                amount:add_amount,
                type_of_expense:"added_amount"
            }
            finance.transactions.push(transaction);
        }
        finance.save();
        res.status(200).json({
            status:"success",
            finance
        })        

    }catch(err){
        res.status(500).json({
            error: "manual error message[SERVER ERROR]",
            errormsg: err.message
        });
    }
}

const myFinanceInfo = async(req,res)=>{
    try{
        const finance = await Finance.findOne({user:req.params.id}).populate('user');
        if(!finance){
            return res.status(400).json({
                status:"Failure",
                msg:"No Finance Record found for this user"
            })
        }
        res.status(200).json({
            status:"success",
            finance
        })        

    }catch(err){
        res.status(500).json({
            error: "manual error message[SERVER ERROR]",
            errormsg: err.message
        });
    }
}





module.exports={getAll,createMyFinance,getMyFinance,updateMyFinance,myFinanceInfo};