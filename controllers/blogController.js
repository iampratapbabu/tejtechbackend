const Blog = require('../models/blogModel');

exports.getAllBlogs =  async (req,res)=>{
	const blogs = await Blog.find().populate('author_user');
	if(!blogs){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
	res.status(200).json({
		status:"SUCCESS",
		total_blogs:blogs.length,
		blogs
	})
}

exports.getSingleBlog = async(req,res) =>{
	try{
		const blog = await Blog.findById(req.params.blogid);
		if(!blog){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
		res.status(200).json({
			status:"SUCCESS",
			blog
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }

}

exports.createSingleBlog =  (req,res)=>{
	try{
		let blog={};
		blog.title = req.body.title,
		blog.body = req.body.body,
		blog.author_user = req.params.userid
		let myblog = new Blog(blog);
		myblog.save(); //aise blog create karte hain to save karna jaroori hota hai
		res.status(200).json({
			status:"SUCCESS",
			blog
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }

}

exports.getMyAllBlogs = async(req,res) =>{
	try{
		const blogs = await Blog.find({author_user:req.params.userid})
		if(blogs.length<=0){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
		res.status(200).json({
			status:"SUCCESS",
			blogs
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }

}

exports.getMySingleBlog = async(req,res) =>{
	try{
		const blog = await Blog.find({_id:req.params.blogid},{user:req.params.userid}).select('title body');
		if(!blog){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
		res.status(200).json({
			status:"SUCCESS",
			blog
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }

}


exports.updateSingleBlog = async(req,res) =>{
	try{

		res.status(200).json({
			status:"SUCCESS",
			blog
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }
}

exports.deleteSingleBlog = async(req,res) =>{
	try{
		const blog = await Blog.find({_id:req.params.blogid},{user:req.params.userid});
		if(!blog){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
		console.log(blog[0])
		console.log(blog[0].user,req.params.userid)
		if(blog[0].user != req.params.userid){return res.status(400).json({status:"FAILURE",msg:"Your are Not Authorized"})}
		blog.remove();
		res.status(200).json({
			status:"SUCCESS",
			blog
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }
}