const User = require('../models/userModel');
const {errorResponse,successResponse} = require('../lib/responseHandler');
const jwt = require('jsonwebtoken');


const getAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    successResponse(res,'successfully fetched all users',200,{totat_users:users.length,users});

  }catch(err){
    errorResponse(res,'users data could not be fetched',500,err);
  }
}

const signup = async(req,res,err) =>{
  try{
    const {firstname,lastname,email,phone,password,confirmPassword} = req.body;
    const checkuser = await User.findOne({email:email});
    if(checkuser){return errorResponse(res,'user already exists',200,null);};
    if(password != confirmPassword){return errorResponse(res,'password not matches',200,null);};
     const user = new User({
      firstname,
      lastname,
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
    errorResponse(res,'users registration failure',500,err);
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
      errorResponse(res,'invalid credentials',200,null);
    }
  }catch(err){
    errorResponse(res,'login error',200,null);
  }
}


const getMe = (req,res) =>{
  try{
    successResponse(res,'user info',200,req.user);
  }catch (err) {
    errorResponse(res,'user finding error',500,null);
  }
}

module.exports={
  getAllUsers,
  signup,
  loginUser,
  getMe
}
