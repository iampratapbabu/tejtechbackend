const Blog = require('../models/blogModel');

exports.getAllBlogs =  async (req,res)=>{
	const blogs = await Blog.find().populate('author_user');
	res.status(200).json({
		status:"SUCCESS",
		total_blogs:blogs.length,
		blogs
	})
}

exports.createBlog =  (req,res)=>{
	try{
		let blog={};
		blog.title = req.body.title,
		blog.body = req.body.body,
		blog.author_user = req.params.user_id
		let myblog = new Blog(blog);
		myblog.save(); //aise blog create karte hain to save karna jaroori hota hai
		console.log("objet blog",blog);
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



exports.getSingleBlog = (req,res) =>{
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


exports.updateSingleBlog = (req,res) =>{
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

exports.deleteSingleBlog = (req,res) =>{
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