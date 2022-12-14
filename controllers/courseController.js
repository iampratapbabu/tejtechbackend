const Course = require('../models/courseModel');
const User = require('../models/userModel');
const middle = require('../middlewares/middle');


exports.demoMiddleware = (req,res,next) =>{
  console.log("middleware runs");
  next();
};

const normaldemo = () =>{
   console.log("this is normal demo function");
}


exports.getAllCourse = async(req,res,next) =>{
  normaldemo();
  
  middle.myMiddle2();
  const courses = await Course.find();
  res.status(200).json({
    status:"success",
    totalCourses:courses.length,
    courses
  });
};

exports.createCourse = async(req,res) =>{
	try{
		const course = await Course.create({
    	title:req.body.title,
    	body:req.body.body,
    	courseUrl:req.body.courseUrl,
    	imageUrl:req.body.imageUrl,
    	category:req.body.category
  });
  	res.status(201).json({
       status:"success",
       course
   });

	}catch(err){
		res.status(500).json({
			status:"SERVER ERROR",
			msg:err.msg
		})
	}

}

exports.getSingleCourse = async(req,res) =>{
  try{
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  }catch(err){
    res.status(500).json({
      status:"SERVER ERROR",
      msg:err.msg
    })

  }
}

exports.updateSingleCourse = async(req,res) =>{
  try{
     const course = await Course.findByIdAndUpdate(req.params.id,req.body,{new:true});
     res.status(200).json(course);
  }catch(err){
    res.status(500).json({
      status:"SERVER ERROR",
      msg:err.msg
    })

  }
}


exports.deleteSingleCourse = async(req,res) =>{
  try{
     const course = await Course.findByIdAndDelete(req.params.id);
     res.status(200).json({
      msg:"deleted successfully"
    });
  }catch(err){
    res.status(500).json({
      status:"SERVER ERROR",
      msg:err.msg
    })

  }
}

