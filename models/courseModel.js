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
	realUrl:String,
	category:{
		type:[],
		//enum:['app-development','fullstack-development','frontend-devlopment','backend-devlopment','dsa','programming-languages','datbase','blockchain','devops','system-desing','cs-subjects'],
		default:'fullstack-development'
	}

});

const Course = mongoose.model('Course',courseSchema);
module.exports = Course;