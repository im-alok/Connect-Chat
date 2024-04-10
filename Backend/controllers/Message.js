const User = require('../Model/User');
const Message = require('../Model/Message');
const Chat = require('../Model/IndividualChat');
const Group = require('../Model/Group');

exports.sendMessage = async(req,res)=>{
    try {
        const {message,chatId,groupId} = req.body;
        const userId = req.user.id;

        if(chatId!=null && chatId!=undefined && chatId!=""){
            if(!message,!chatId){
                return res.status(400).json({
                    success:false,
                    message:'All fields are required'
                })
            }
            if(!await Chat.findById(chatId)){
                return res.status(405).json({
                    success:false,
                    message:'Invalid chat Id'
                })
            }
    
            var newMessage = {
                senderId:userId,
                ChatId:chatId,
                message:message
    
            }
    
            const deliverMessageDetails = await Message.create(newMessage);

            const deliverMessage = await Message.findById(deliverMessageDetails._id).populate("senderId").exec();
    
            //updating the latestMessage
            const latestMessageDetails = await Chat.findByIdAndUpdate(chatId,{latestMessage:deliverMessage._id},{new:true}).populate("users").populate("latestMessage").exec();

            const latestMessage ={
                chat:latestMessageDetails,
                deliverMessage
            }
            // console.log(latestMessage);
    
            return res.status(200).json({
                success:true,
                message:'Message delivered successfully',
                latestMessage
            })
        }

        else if(groupId!=null && groupId!=undefined && groupId!=""){
            // console.log(groupId)
            if(!message||!groupId){
                return res.status(400).json({
                    success:false,
                    message:'All fields are required'
                })
            }
            if(!await Group.findById(groupId)){
                return res.status(405).json({
                    success:false,
                    message:'Invalid group Id'
                })
            }
    
            var newMessage = {
                senderId:userId,
                groupId:groupId,
                message:message
    
            }
    
            const deliverMessageDetails = await Message.create(newMessage);
            const deliverMessage = await Message.findById(deliverMessageDetails._id).populate('senderId')
    
            //updating the latestMessage
            const latestMessageDetails = await Group.findByIdAndUpdate(groupId,{latestMessage:deliverMessage._id}).populate("users").populate('latestMessage').exec();
    
            const latestMessage ={
                chat:latestMessageDetails,
                deliverMessage
            }
            // console.log(latestMessage);

            return res.status(200).json({
                success:true,
                message:'Message delivered successfully',
                latestMessage
                
            })
        }

        else{
            return res.status(404).json({
                success:false,
                message:'conversation id is not valid'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}

exports.fetchMessage = async(req,res)=>{
    try {
        const {chatId} = req.query;
        if(!chatId){
            return res.status(400).json({
                success:false,
                message:'Chat id is required'
            })
        }
        const chatDetails = await Chat.findById(chatId);
        if(!chatDetails){
            return res.status(404).json({
                success:false,
                message:'invalid chat Id'
            })
        }

        //finding all the message
        const messageDetails = await Message.find({ChatId:chatDetails._id})
                                .populate("senderId","-password").sort()
                                .exec();
        if(!messageDetails){
            return res.status(400).json({
                success:false,
                message:"No new message is founded"
            })
        }
        return res.status(200).json({
            success:true,
            message:'data fetched successfully',
            messageDetails
        })
    } catch (error) {
        console.log(error);
        return res.status({
            success:false,
            message:'something got wrong'
        })
    }
}

exports.fetchGroupMessage = async(req,res)=>{
    try {
        const {chatId} = req.query;
        if(!chatId){
            return res.status(400).json({
                success:false,
                message:'groupId is required'
            })
        }
        const groupDetails = await Group.findById(chatId);
        if(!groupDetails){
            return res.status(404).json({
                success:false,
                message:'invalid group Id'
            })
        }

        //finding all the message
        const messageDetails = await Message.find({groupId:groupDetails._id})
                                .populate("senderId","-password").sort()
                                .exec();
        if(!messageDetails){
            return res.status(400).json({
                success:false,
                message:"No new message is founded"
            })
        }
        return res.status(200).json({
            success:true,
            message:'data fetched successfully',
            messageDetails
        })
    } catch (error) {
        console.log(error);
        return res.status({
            success:false,
            message:'something got wrong'
        })
    }
}