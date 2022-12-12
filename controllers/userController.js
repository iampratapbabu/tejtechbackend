const User = require('../models/userModel');


exports.getAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    res.status(200).json({
      total:users.length,
      users
    });
  }catch(err){
    res.status(500).json({
      "error":"manual error message",
      "error msg":err.message
    });
  }


}


exports.createUser = async(req,res) =>{
  try{
     const user = await User.create({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email,
       password:req.body.password,
       confirmpassword:req.body.confirmPassword,
       role:req.body.role,
       avatar:req.body.avatar,
       gender:req.body.gender,
       active:req.body.active

     });
     res.status(201).json({
       status:"success",
       user
     })
  }catch(err){
    res.status(500).json({
      "error":"manual error message",
      "error msg":err
    });
  }
}

exports.loginUser = async(req,res) =>{
  try{
    const user = await User.findOne({email:req.body.userid}).select('+password');
    console.log(user);
    if(!user){
      res.status(403).json({
        "msg":"user not found"
      })
    }
    else if(user.password == req.body.password){
      res.status(200).json({
        "status":"success",
        "msg":"user logged in successfully"
      })

    }else{
      res.json({"msg":"Credentials invalid"});
    }

  }catch(err){
    res.status(500).json({
      "status":"error",
      "err message":err
    })
  }
}

