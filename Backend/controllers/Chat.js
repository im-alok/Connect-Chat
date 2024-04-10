const user = require('../Model/User');
const Individual = require('../Model/IndividualChat');
const Group = require('../Model/Group');
const { default: mongoose } = require('mongoose');

exports.searchUser = async(req,res)=>{
    try {
        const id = req.user.id;
        const {search} = req.query;
        if(!search){
            return res.status(404).json({
                success:false,
                message:'Atleast one searching parameter is required'
            })
        }
        // console.log(search)
        const parameter = {
            $or:[
                {name:{$regex:search,$options:"i"}},
                {email:{$regex:search,$options:"i"}},
                {username:{$regex:search,$options:"i"}}
            ]
        };
        // && {_id:{$ne:id}}
        const users = await user.find(parameter).find({_id:{$ne:id}}).lean();
        return res.status(200).json({
            success:true,
            message:"User found successfully",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

//creating one to one chat with user
exports.createChat = async(req,res)=>{
    try {
        const {friendId} = req.body;
        const userId = req.user.id;
        if(!friendId){
            return res.status(404).json({
                success:false,
                message:"Id not found"
            })
        }

        //check if there is chat already available or not
        const userChat = await Individual.findOne({
            $and:[
                {users:{$elemMatch:{$eq:userId}}},
                {users:{$elemMatch:{$eq:friendId}}}
            ]
        })
                            .populate("users","-password")
                            .exec();
        
        // console.log(userChat);
        if(userChat){
            return res.status(200).json({
                success:true,
                message:'chat already available',
                userChat
            })
        }

        //create chat with that user
        const newUserPayloads= {
            latestMessage:null,
            users:[userId,friendId]
        }
        const newUserChat = await Individual.create(newUserPayloads);

        const newUserFullChat = await Individual.findById(newUserChat._id)
                            .populate("users","-password")
                            .exec();

        
        // console.log(newUserFullChat);
        //return the response
        return res.status(200).json({
            success:true,
            message:'chat Created Successfully',
            newUserFullChat
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.fetchChats = async(req,res)=>{
    // console.log('Hello')
    try {
        const userId = req.user.id;
        // console.log(userId)
        const userChat = await Individual.find({users:{$elemMatch:{$eq:userId}}})
                                        .populate("users")
                                        .populate("latestMessage")
                                        .sort({updatedAt:-1})
                                        .exec();
        // console.log(userChat);
        if(!userChat){
            return res.status(404).json({
                success:false,
                message:'No chat is found'
            })
        }

        const groupChat = await Group.find({users:{$elemMatch:{$eq:userId}}}).populate('users').populate('groupAdmin').populate("latestMessage").sort({updatedAt:-1}).exec();
        // console.log(groupChat);

        return res.status(200).json({
            success:true,
            message:"fetched Successfully",
            userChat,
            groupChat
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}

exports.createGroupChat = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {groupName,users} = req.body;
        if(!groupName || users.length === 0){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        //validation for users is required

        var members = JSON.parse(users);
        members.push(userId);

        const groupChat = await Group.create({
            groupName:groupName,
            users:members,
            groupAdmin:userId,
            profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=${groupName}`
        });

        const groupChatDetails = await Group.findById(groupChat._id)
                                                .populate('users')
                                                .populate('groupAdmin')
                                                .exec();

        return res.status(200).json({
            success:true,
            message:'group created successfully',
            groupChatDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}

// exports.getAllGroupChat = async(req,res)=>{
//     try {
//         const userId = req.user.id;
//         const userFullGroupChat = await Group.find({users:{$elemMatch:{$eq:userId}}}).populate('users').populate('groupAdmin');

//         return res.status(200).json({
//             success:true,
//             message:'Group chat fetched successfully',
//             userFullGroupChat
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:'Something went wrong'
//         })
//     }
// }

exports.renameGroup = async (req,res)=>{
    try {
        
        const userId = req.user.id;
        console.log(uid);
        const {groupName,groupId} = req.body;
        if(!groupName || !groupId){
            return res.status(400).json({
                success:false,
                message:'something is missing'
            })
        }

        const groupDetails = await Group.findById(groupId);
        if(!groupDetails){
            return res.status(404).json({
                success:false,
                message:'wrong group ID'
            })
        }
        if(groupDetails.groupAdmin != userId){
            return res.status(400).json({
                success:false,
                message:'Only Admin can change the group name'
            })
        }

        const updatedGroupDetails = await Group.findByIdAndUpdate(groupId ,{groupName:groupName},{new:true});
        
        return res.status(200).json({
            success:true,
            message:'Name updated SuccessFully',
            updatedGroupDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

exports.removeFromGroup=async (req,res)=>{
    try {
        const {users,groupId} = req.body;
        if(users.length == 0 || !groupId){
            return res.status(400).json({
                success:false,
                message:'no user to remove/no groupId found'
            })
        }

        const groupDetails = await Group.findById(groupId);
        if(!groupDetails){
            return res.status(404).json({
                success:false,
                message:'wrong group ID'
            })
        }

        if(groupDetails.groupAdmin != req.user.id){
            return res.status(400).json({
                success:false,
                message:'Only Admin can add/remove users'
            })
        }


        for(const member of users){
            console.log(member);
            const memberId = new mongoose.Types.ObjectId(member);
            if(!groupDetails.users.includes(memberId)){
                return res.status(404).json({
                    success:false,
                    message:'One/many user is not belong to this group'
                })
            }
            groupDetails.users.pull(memberId);
            // console.log(groupDetails);
        }
        await groupDetails.save();

        const updatedGroupDetails = await Group.findById(groupDetails._id).populate('users').populate('groupAdmin').exec();

        return res.status(200).json({
            success:true,
            message:'User removed successfully',
            updatedGroupDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success:false,
            message:'Something went wrong'
        })
    }
}


exports.addToGroup=async (req,res)=>{
    try {

        const {users,groupId} = req.body;
        if(users.length == 0 || !groupId){
            return res.status(400).json({
                success:false,
                message:'no user to remove/no groupId found'
            })
        }

        const groupDetails = await Group.findById(groupId);
        if(!groupDetails){
            return res.status(404).json({
                success:false,
                message:'wrong group ID'
            })
        }

        if(groupDetails.groupAdmin != req.user.id){
            return res.status(400).json({
                success:false,
                message:'Only Admin can add/remove users'
            })
        }

        for(const member of users){
            const memberId = new mongoose.Types.ObjectId(member);
            if(groupDetails.users.includes(memberId)){
                return res.status(404).json({
                    success:false,
                    message:'One/many user(s) are already part of this group'
                })
            }
            groupDetails.users.push(memberId);
        }
        await groupDetails.save();

        const updatedGroupDetails = await Group.findById(groupDetails._id).populate('users').populate('groupAdmin').exec();

        return res.status(200).json({
            success:true,
            message:'User Added successfully',
            updatedGroupDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

exports.editGroup = async (req,res)=>{
    try {
        // console.log(req.body);
        const {groupName,users,groupId} = req.body;
        if(!groupName || !users || !groupId){
            return res.status(400).json({
                success:false,
                message:'all fields are required'
            })
        }

        

        //searching whether the groupDetails is pressrnt or no
        const groupDetails = await Group.findById(groupId);
        if(!groupDetails){
            return res.status(400).json({
                success:false,
                message:'group id id Invalid'
            })
        }

        //check is the user editing the group is admin or not
        const userId = req.user.id;
        // console.log(groupDetails.groupAdmin , userId)
        if(groupDetails.groupAdmin != userId){
            return res.status(400).json({
                success:false,
                message:'only group admin can change the group details'
            })
        }

        var members = JSON.parse(users);
        groupDetails.groupName = groupName;
        groupDetails.users = members;

        const updatedGroupDetails = await groupDetails.save();

        const updatedDetails = await Group.findById(updatedGroupDetails._id);

        return res.status(200).json({
            success:true,
            message:'groupDetails updated successfully',
            updatedDetails
        })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:'something went wrong'
            })
    }
}


exports.getGroupDetails = async(req,res)=>{
    // console.log(req.query);
    try {
        const {groupId} = req.query;
        if(!groupId){
            return res.status(400).json({
                success:false,
                message:"groupId is required"
            })
        }

        //searching for that group
        const groupDetails = await Group.findById(groupId)
            .populate({
                path:"users",
                select:"-password",
                populate:{
                    path:'additionalDetails'
                }
            }).populate({
                path:"groupAdmin",
                select:'-password',
                populate:{
                    path:"additionalDetails"
                }
            })

            return res.status(200).json({
                success:true,
                message:'groupDetails fetched Successfully',
                groupDetails
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            messsage:'Something went wrong'
        })
    }
}