const mongoose = require('mongoose');
const mailSender = require('../config/mailSender');
const otpTemplate = require('../mailTemplate/emailVerificationTemplate');
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

async function sendVerificationMail(email,otp){
    try {
        const response = await mailSender(email,verification | ConnectChat , otpTemplate(otp));
        // console.log(response);
    } catch (error) {
        console.log(error);
        console.log('Error from model in sending verification mail');
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otpValue);
    next();
})

exports.module = mongoose.model('OTP',otpSchema);