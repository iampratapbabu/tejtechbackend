const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,"email is required"]   
    },
    otp:{
        type:Number,
        default:null,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

});

module.exports = mongoose.model('Otp',otpSchema);
