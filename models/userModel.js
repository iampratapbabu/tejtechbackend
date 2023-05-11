const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:[true,"firstname is required"]
  },
  lastName: {
    type: String,
    required:[true,"lastname is required"]
  },
  email: {
    type: String,
    required:[true,"email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  phone:{
    type:Number,
    required:[true,"phone number is required"],
    unique: true,
  },
  countryCode:{
    type:Number,
    default:null
  },
  gender: {
    type: String,
    default:null
  },
  verifiedAt:{
    type:Date,
    default:null
  },
  role: {
    type: String,
    enum: ['user', 'developer', 'admin'],
    default: 'user'
  },
  photo: {
    type: String,
    default:null
  },
  active: {
    type: Boolean,
    default: true,
  },
  targetExpense:{
    type:Number,
    default:0,
  },
  totalExpense:{
    type:Number,
    default:0
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
