const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

const {errorResponse,successResponse} = require('../lib/responseHandler');
const jwt = require('jsonwebtoken');

//authentication
const getAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    successResponse(res,'successfully fetched all users',200,{totat_users:users.length,users});

  }catch(err){
    errorResponse(res,'getAllUsers',500,err);
  }
}

const signup = async(req,res,err) =>{
  try{
    const {firstname,lastname,email,phone,password,confirmPassword} = req.body;
    const checkuser = await User.findOne({email});
    if(checkuser){return errorResponse(res,'user already exists',200,null);};
    if(password != confirmPassword){return errorResponse(res,'password not matches',200,null);};
     const user = new User({
      firstName:firstname,
      lastName:lastname,
      email,
      phone,
      password,
      confirmPassword
    });
    user.save();
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });

    successResponse(res,'user registration successfull',200,{token,user});

  }catch(err){
    errorResponse(res,'signup',500,err);
  }
}

const loginUser = async(req,res) =>{
  try{
    const user = await User.findOne({email:req.body.userid}).select('+password');
    console.log(user);
    if(!user){
      return errorResponse(res,'user not exist',200,null);
    }
    else if(user.password == req.body.password){
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      successResponse(res,'user loggedin successfully',200,{token,user});
    }else{
      errorResponse(res,'invalid credentials',500,null);
    }
  }catch(err){
    errorResponse(res,'loginUser',500,null);
  }
}

const getMe = (req,res) =>{
  try{
    successResponse(res,'user info',200,req.user);
  }catch (err) {
    errorResponse(res,'getMe',500,null);
  }
}

//updation and deletion


//transactions
const getAllTransactions = async(req,res) =>{
  try{
      console.log(req.user);
      let transactions = await Transaction.find({userId:req.user._id});
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
          userId:req.user._id,
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


module.exports={
  getAllUsers,
  signup,
  loginUser,
  getMe,
  getAllTransactions,
  createTransaction
}
