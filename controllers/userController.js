const User = require('../models/userModel');
const { errorResponse, successResponse } = require('../lib/responseHandler');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcrypt');
const CustomError = require('../lib/customError');
const { userPortfolioSummary } = require('../service/userPortfolioService');



//authentication
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    successResponse(res, 'Successfully Fetched All Users', { totalUsers: users.length, users });
  } catch (err) {
    errorResponse(res, 'user_error', err);
  }
}

//image uploading
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // directory to check if exists
    const dir = './uploads/user-img'
    // check if directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdir("./uploads/user-img", function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("new directory successfully created.")
        }
      })
    }
    cb(null, "uploads/user-img");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "_") + "_" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  //console.log("file filter runs")
}

let upload = multer({ storage: fileStorage, fileFilter: fileFilter })
const uploadImage = upload.single('userphoto'); //sending image with key name as userphoto if we change the key  name to file then we have to 
//write file instead of userphoto

const imagesUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'coverphoto', maxCount: 5 }]);
//uploading single single image with different names

//uploading multiple images in one go
const uploadMultipleImages = upload.array('userphotos', 10);

const signup = async (req, res, err) => {
  try {
    let { firstName, lastName, email,gender, phone, password, confirmPassword } = req.body;
    const checkPhone = await User.findOne({ phone });
    if (checkPhone) { throw new CustomError("auth_error", 400, "Phone Has Already Been Registered") }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) { throw new CustomError("auth_error", 400, "Email Has Been Already Registered") };
    if (password != confirmPassword) { throw new CustomError("auth_error", 400, "Password Not Matched With Confirm Password") };
    password = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      gender,
      email,
      phone,
      password,

    });

    //setting user profile photo
    if (req.file) {
      user.photo = req.file.path;
    }

    await user.save();

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });

    successResponse(res, 'User Has Been Registered Successfully', { token, user });

  } catch (err) {
    console.log(err);
    errorResponse(res, 'auth_error', err);
  }
}

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.userid }).select('+password');
    console.log(user);
    if (!user) {
      throw new CustomError("auth_error", 400, "User Not Exists");
    }
    else if (await bcrypt.compare(req.body.password, user.password)) {
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      //get user portfolio summary
      req.user = user;
      const userPortfolio = await userPortfolioSummary(req);
      return successResponse(res, 'LoggedIn Successfully', { token, user, userPortfolio });
    } else {
      throw new CustomError("auth_error", 400, "Username OR Password Is Incorrect");
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 'auth_error', err);
  }
}

const getMe = (req, res) => {
  try {
    successResponse(res, 'User Fetched Successfully', req.user);
  } catch (err) {
    errorResponse(res, 'user_error', err);
  }
}

//updation and deletion
const editUser = async (req, res) => {
  try {
    console.log(req.file);
    const { firstName, lastName, email, phone, gender, countryCode } = req.body;
    let user = await User.findById(req.user._id);
    user.firstName = firstName || req.user.firstName;
    user.lastName = lastName || req.user.lastName;
    user.email = email || req.user.email;
    user.phone = phone || req.user.phone;
    user.gender = gender || req.user.gender;
    user.countryCode = countryCode || req.user.countryCode;

    if (req.file) {
      user.photo = req.file.path;
      console.log("Photo updated of", user.firstName);
    }

    await user.save();
    successResponse(res, 'User Info Updated', user);
  } catch (err) {
    errorResponse(res, 'user_error', err);
  }
}

//admin function
const deleteUser = async (req, res) => {
  try {
    successResponse(res, 'user info', req.user);
  } catch (err) {
    errorResponse(res, 'user_error', err);
  }
}



module.exports = {
  getAllUsers,
  uploadImage,
  imagesUpload,
  uploadMultipleImages,
  signup,
  loginUser,
  getMe,
  editUser,
  deleteUser
}
