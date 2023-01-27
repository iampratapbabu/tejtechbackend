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

const getMyFinance = async(req,res) =>{
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

const updateMyFinance = async(req,res) =>{
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





module.exports={getAll,createMyFinance,getMyFinance,updateMyFinance}