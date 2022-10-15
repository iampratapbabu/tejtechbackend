const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname:{
        type:String,
   },
   lastname:{
        type:String,
   },

    email:{
        type:String,
        unique:true,
        required:[true,"Please Provide the Blog body"]

    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    confirmpassword:{
        type:String,

    }

});

const Blog = mongoose.model('User',userSchema);

module.exports = Blog;
