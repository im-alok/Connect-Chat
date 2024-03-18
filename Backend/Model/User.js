const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
            type:String,
            required:true,
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);