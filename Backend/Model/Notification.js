const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    chatId:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
    },
    read:{
        type:Boolean,
    },

},{timestamps:true})
module.exports = mongoose.model('Notification',notificationSchema);