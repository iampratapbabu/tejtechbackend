const Blog = require('../models/blogModel');
const User = require('../models/userModel');


exports.demoMiddleware = (req,res,next) =>{
  console.log("middleware runs");
  next();
};


exports.getAllBlogs = async(req,res) =>{
  const blogs = await Blog.find();
  res.status(200).json({
    status:"success",
    blogs
  });
};

exports.createBlog = async (req,res) =>{
  const blog = await Blog.create({
    title:req.body.title,
    body:req.body.body,
    category:req.body.category
  });
  res.status(201).json({
       status:"success",
       blog
   });
}

exports.createUser = async(req,res) =>{
  try{
     const user = await User.create({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email,
       password:req.body.password,
       confirmpassword:req.body.confirmPassword
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
    const user = await User.findOne({email:req.body.userid});
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

exports.getAll = async(req,res)=>{
  try{
    const user = await User.find();
    res.status(200).json({
      total:user.length,
      user
    });
  }catch(err){
    res.status(500).json({
      "error":"manual error message",
      "error msg":err.message
    });
  }


}


exports.getSingleBlog = (req,res) =>{
  console.log(req.params.id);
  res.send("Getting single blog");
}


exports.updateSingleBlog = (req,res) =>{
  console.log(req.params.id);
  res.send("Updating single blog");
}

exports.deleteSingleBlog = (req,res) =>{
  console.log(req.params.id);
  res.send("deleting single blog");
}
