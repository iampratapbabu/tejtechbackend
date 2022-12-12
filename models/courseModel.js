const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	title:{
		type:String,
		required:[true,'A Title is Required for the blog']
	},
	body:{
		type:String,
		required:[true,'Please provide the body for blog']
	},
	courseUrl:{
		type:String,
		select:false,
	},
	password:{
		type:String,
		select:false
	},
	imageUrl:String,
	realUrl:String,
	category:{
		type:[],
		default:'fullstack-development'
	}

});

const Course = mongoose.model('Course',courseSchema);
module.exports = Course;