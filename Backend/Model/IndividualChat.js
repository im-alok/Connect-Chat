const mongoose = require('mongoose');

const IndividualChatSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
},{timestamps:true})

module.exports = mongoose.model('IndividualChat',IndividualChatSchema);