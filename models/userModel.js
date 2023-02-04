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
    unique: [true,"Email already exists"],
    required: [true, "Please Provide your email"]

  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password Do Not Match",
    },

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
  createAt:{
    type:Date,
    default:Date.now(),
  },
  passwordChangedAt: String,
  passwordResetToken: String,
  passwordResetExpires: Date

});

// userSchema.post('save', function(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('email must be unique'));
//   } else {
//     next(error);
//   }
// });

userSchema.post('save', function (err) {
  if (err) {
    return res.status(400).send({
        message: (err.name === 'MongoError' && err.code === 11000) ? 'Email already exists !' : errorHandler.getErrorMessage(err)
    });
  }
  else {
    return console.log('No Error');
  }
});



const Blog = mongoose.model('User', userSchema);

module.exports = Blog;
