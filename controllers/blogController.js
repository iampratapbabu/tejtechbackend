const Blog = require('../models/blogModel');

exports.getAllBlogs =  (req,res)=>{
	res.status(200).json({
		"data":"this is all blogs"
	})
}

exports.createBlog =  (req,res)=>{
	console.log(req.body);
	let blog={};
	blog.title = req.body.title,
	blog.body = req.body.body,
	blog.author = req.body.author
	let myblog = new Blog(blog);
	myblog.save(); //aise blog create karte hain to save karna jaroori hota hai
	console.log("objet blog",blog);
	res.status(200).json({
		status:"Success",
		blog
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