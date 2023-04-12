const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  phone:String,
  gender: {
    type: String,
  },
  otp:Number,
  verified:{
    type:Boolean,
    default:false
  },
  role: {
    type: String,
    enum: ['user', 'developer', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  targetExpense:{
    type:Number
  },
  totalExpense:{
    type:Number
  },
  createAt:{
    type:Date,
    default:Date.now(),
  },
  passwordChangedAt: String,
  passwordResetToken: String,
  passwordResetExpires: Date

});


const User = mongoose.model('User', userSchema);

module.exports = User;
