const Blog = require('../models/blogModel');

exports.getAllBlogs =  (req,res)=>{
	res.status(200).json({
		"data":"this is all blogs"
	})
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