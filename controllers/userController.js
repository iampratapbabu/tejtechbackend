const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const {errorResponse,successResponse} = require('../lib/responseHandler');
const jwt = require('jsonwebtoken');
const fs=require('fs');
const multer = require('multer');


//authentication
const getAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    successResponse(res,'successfully fetched all users',200,{totalUsers:users.length,users});

  }catch(err){
    errorResponse(res,'getAllUsers',500,err);
  }
}

//image uploading
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // directory to check if exists
    const dir = './uploads/user-img'
    // check if directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdir("./uploads/user-img", function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("New directory successfully created.")
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
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
    //console.log("file filter runs")
}

let upload = multer({storage:fileStorage,fileFilter:fileFilter})
const uploadImage = upload.single('userphoto'); //sending image with key name as userphoto if we change the key  name to file then we have to 
//write file instead of userphoto

const imagesUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'coverphoto', maxCount: 5 }]);
//uploading single single image with different names

//uploading multiple images in one go
const uploadMultipleImages = upload.array('userphotos',10);

const signup = async(req,res,err) =>{
  try{
    const {firstName,lastName,email,phone,password,confirmPassword} = req.body;
    const checkPhone = await User.findOne({phone});
    if(checkPhone){return errorResponse(res,"This Phone Number has Been already Registered Please Login",200,{})};
    const checkEmail = await User.findOne({email});
    if(checkEmail){return errorResponse(res,"This Email has Been already Registered Please Login",200,{})};
    
    if(password != confirmPassword){return errorResponse(res,'password not matches',200,{});};
     const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    
    });

    //setting user profile photo
    if (req.file) {
      user.photo = req.file.path;
    }

    await user.save();

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
      return errorResponse(res,'user not exist',200,{});
    }
    else if(user.password == req.body.password){
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      successResponse(res,'user loggedin successfully',200,{token,user});
    }else{
      errorResponse(res,'invalid credentials',400,"username or password is incorrect");
    }
  }catch(err){
    errorResponse(res,'loginUser',500,err);
  }
}

const getMe = (req,res) =>{
  try{
    successResponse(res,'user fetched successfully',200,req.user);
  }catch (err) {
    errorResponse(res,'getMe',500,err);
  }
}

//updation and deletion
const editUser = async(req,res) =>{
  try{
    console.log(req.file);
    const {firstName,lastName,email,phone,gender,countryCode} = req.body;
    let user = await User.findById(req.user._id);
    user.firstName = firstName || req.user.firstName;
    user.lastName = lastName || req.user.lastName;
    user.email = email || req.user.email;
    user.phone = phone || req.user.phone;
    user.gender = gender || req.user.gender;
    user.countryCode = countryCode || req.user.countryCode;

    if (req.file) {
      user.photo = req.file.path;
      console.log("photo updated of",user.firstName);
    }

    await user.save();
    successResponse(res,'user info updated',200,user);
  }catch (err) {
    errorResponse(res,'editUser',500,err);
  }
}


//admin function
const deleteUser = async(req,res) =>{
  try{
    successResponse(res,'user info',200,req.user);
  }catch (err) {
    errorResponse(res,'deleteUser',500,null);
  }
}


module.exports={
  getAllUsers,
  uploadImage,
  imagesUpload,
  uploadMultipleImages,
  signup,
  loginUser,
  getMe,
  editUser,
  deleteUser,
}
