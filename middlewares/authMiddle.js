const User = require('../models/userModel');
const { errorResponse, successResponse } = require('../lib/responseHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../lib/customError');


const protect = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      throw new CustomError("auth_error",401,"Failed To Authenticate");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded",decoded);
    let user = await User.findById(decoded.id);
    if (!user){
      throw new CustomError("auth_error",401,"No User Found");
    }
    req.user = user;
    next();

  } catch (err) {
    console.log(err);
    errorResponse(res, 'Authentication Error', err);
  }
}

const checkAdmin = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      next();
    } else {
      errorResponse(res, 'Authentication Error', "You Are Not An Admin");
    }

  } catch (err) {
    errorResponse(res, 'admin_error', err);
  }
}


module.exports = {
  protect,
  checkAdmin,
};