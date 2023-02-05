const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


exports.getAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    res.status(200).json({
      total:users.length,
      users
    });
  }catch(err){
    res.status(500).json({
      status:"[SERVER ERROR]",
      errormsg:err
    })
  }
}

exports.signup = async(req,res,err) =>{
  try{
    const {firstname,lastname,email,phone,password,confirmPassword} = req.body;
    const checkuser = await User.findOne({email:email});
    if(checkuser){return res.status(200).json({status:"fail",msg:"user already exists with this email"})};
    if(password != confirmPassword){return res.status(200).json({status:"fail",msg:"Password Not matches"})};
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
      res.status(200).json({
        status:"success",
        auth:true,
        token,
        user,
      })
  }catch(err){
    res.status(500).json({
      status:"[SERVER ERROR]",
      errormsg:err
    })
  }
}

exports.loginUser = async(req,res) =>{
  try{
    const user = await User.findOne({email:req.body.userid}).select('+password');
    console.log(user);
    if(!user){
      res.status(403).json({
        status:"fail",
        "msg":"user not found"
      })
    }
    else if(user.password == req.body.password){
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({
        status:"success",
        auth:true,
        token,
        user,
      })

    }else{
      res.json({status:"fail",msg:"Credentials invalid"});
    }

  }catch(err){
    res.status(500).json({
      status:"[SERVER ERROR]",
      errormsg:err.message
    })
  }
}

exports.protect = async (req, res,next) => {
  try {
    let token = req.headers['x-access-token'];
    console.log(token);
    if(!token){
        res.status(401).json({auth:false,message:"Failed to Authenticate"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY , (err, decoded) => {
        if (err) return res.status(500).json({ status:"fail",auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(500).json({status:"fail",auth:false,messge:"There was a problem finding the user."});
            if (!user) return res.status(404).json({status:"fail",auth:false,message:"No user found"});
            req.user=user;
            next();
        });
    });
  } catch (err) {
    res.status(500).json({
      status: "Manul Error message[SERVER ERROR]",
      errormsg: err.message
    })
  }
}

exports.getMe = (req,res) =>{
  try{
    res.status(200).json(req.user)
  }catch (err) {
    res.status(500).json({
      status: "Manul Error message[SERVER ERROR]",
      errormsg: err.message
    })
  }
}
