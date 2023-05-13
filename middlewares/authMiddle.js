const User = require('../models/userModel');
const {errorResponse,successResponse} = require('../lib/responseHandler');
const jwt = require('jsonwebtoken');


const protect = async (req, res,next) => {
  try {
    let token = req.headers['x-access-token'];
    if(!token){
        return errorResponse(res,'failed to authenticate',401,null);
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY , (err, decoded) => {
        if (err) return errorResponse(res,'failed to authenticate token',401,null);;

        User.findById(decoded.id, (err, user) => {
            if (err) return errorResponse(res,'error finding the user with the token',401,null);
            if (!user) return errorResponse(res,'no user found',404,null);
            req.user=user;
            next();
        });
    });
  } catch (err) {
    errorResponse(res,'protect middleare',500,err);
  }
}

const checkAdmin = async(req,res,next) =>{
  try{
    if(req.user.role == "admin"){
      next();
    }else{
      errorResponse(res,'you are not an admin',400,"Authorization failed");
    }

  }catch(err){
    errorResponse(res,'checkAdmin ',404,err);
  }
}


module.exports={
  protect,
  checkAdmin,
};