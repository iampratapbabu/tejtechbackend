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
        required:[true,"Please Provide your email"]

    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false,
    },
    confirmpassword:{
        type:String,
        required:[true,"confirm password is required"],
        select:false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password Do Not Match",
    },

    },

    gender:{
      type:String,
    },

    role:{
    type:String,
    enum:['user','developer','admin'],
    default:'user'
    },
    avatar: {
      type: String,
    },
    active:{
      type:Boolean,
      default: true,
      select:false
    },
    passwordChangedAt:String,
    passwordResetToken:String,
    passwordResetExpires:Date

});

const Blog = mongoose.model('User',userSchema);

module.exports = Blog;
