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
	courseUrl:String,
	imageUrl:String,
	category:{
		type:String,
		required:[true,'Category is required']
	}

});

const Course = mongoose.model('Course',courseSchema);
module.exports = Course;