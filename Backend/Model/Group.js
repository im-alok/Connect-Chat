const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    groupName:{
        type:String,
        required:true,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    profilepic:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Group',groupSchema);