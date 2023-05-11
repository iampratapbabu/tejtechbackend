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
    successResponse(res,'successfully fetched all users',200,{totat_users:users.length,users});

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
    const checkuser = await User.findOne({email});
    if(checkuser){return errorResponse(res,'user already exists',200,null);};
    if(password != confirmPassword){return errorResponse(res,'password not matches',200,null);};
     const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    
    });

    if (req.file) {
      user.photo = req.file.path;
    }

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
      errorResponse(res,'invalid credentials',400,"username or password is incorrect");
    }
  }catch(err){
    errorResponse(res,'loginUser',500,err);
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
    }

    await user.save();
      
    successResponse(res,'user info updated',200,user);
  }catch (err) {
    errorResponse(res,'editUser',500,err);
  }
}

const setExpense = (req,res) =>{
  try{
    successResponse(res,'user info',200,req.user);
  }catch (err) {
    errorResponse(res,'deleteUser',500,err);
  }
}


const deleteUser = (req,res) =>{
  try{
    successResponse(res,'user info',200,req.user);
  }catch (err) {
    errorResponse(res,'deleteUser',500,null);
  }
}


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
  uploadImage,imagesUpload,uploadMultipleImages,
  signup,loginUser,getMe,
  editUser,setExpense,deleteUser,
  getAllTransactions,
  createTransaction
}
