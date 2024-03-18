const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],
    message:{
        type:String
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Group",
    },
    

},{timestamps:true});

exports.module = mongoose.model('OTP',otpSchema);