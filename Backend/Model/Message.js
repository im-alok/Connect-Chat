const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String
    },
    ChatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"IndividualChat",
        default:null
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Group",
        default:null
    },
    

},{timestamps:true});

module.exports = mongoose.model('Message',messageSchema);