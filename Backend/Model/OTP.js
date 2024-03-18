const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otpValue:{
        type:String,
        trim:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60 * 5
    }
})

exports.module = mongoose.model('OTP',otpSchema);