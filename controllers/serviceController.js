const User = require('../models/userModel');
const { errorResponse, successResponse } = require('../lib/responseHandler');
const CustomError = require('../lib/customError');


const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      successResponse(res, 'Successfully Fetched All Users', { totalUsers: users.length, users });
    } catch (err) {
      errorResponse(res, 'user_error', err);
    }
  }

  
  module.exports = {
    getAllUsers
  }





