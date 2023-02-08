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

exports.createManyBlogs = async(req,res) =>{
	try{
		const blogs  = await Blog.insertMany(req.body);
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
		const blog = await Blog.findOne({_id:req.params.blogid}).select('title body author_user');
		if(!blog){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
		console.log(blog.author_user,req.params.userid)
		if(blog.author_user != req.params.userid){return res.status(400).json({status:"FAILURE",msg:"No Blog Found for this user id"})}
		//always use JSON.stringify or toString() method when comparing mongoose object ids
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
		const blog = await Blog.findOne({_id:req.params.blogid}).select('title body author_user');
		if(!blog){return res.status(400).json({status:"FAILURE",msg:"NO Record Found"})}
		console.log(blog.author_user,req.params.userid)
		if(blog.author_user != req.params.userid){return res.status(400).json({status:"FAILURE",msg:"NOT AUTHORIZED"})}
		blog.remove();
		res.status(200).json({
			status:"REMOVED SUCCESSFULLY",
			blog
		});
	}catch(err){
        res.status(500).json({
            error: "[SERVER ERROR]",
            errormsg: err.message
        });
    }
}