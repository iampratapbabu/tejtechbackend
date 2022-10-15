const Course = require('../models/courseModel');
const User = require('../models/userModel');


exports.demoMiddleware = (req,res,next) =>{
  console.log("middleware runs");
  next();
};


exports.getAllCourse = async(req,res) =>{
  const courses = await Course.find();
  res.status(200).json({
    status:"success",
    courses
  });
};

exports.createCourse = async(req,res) =>{
	const course = await Course.create({
    title:req.body.title,
    body:req.body.body,
    courseUrl:req.body.courseUrl,
    imageurl:req.body.imageurl,
    category:req.body.category
  });
  res.status(201).json({
       status:"success",
       course
   });
}
