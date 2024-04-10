const user = require('../Model/User');
const chat = require('../Model/IndividualChat');
exports.findFriendDetails = async(req,res) =>{
    try {
        // console.log(req.query)
        const {id} = req.query;
        if(!id){
            return res.status(404).json({
                success:false,
                message:'id is required'
            })
        }

        const userDetails = await user.findById(id,"-password").populate('additionalDetails')

        if(!userDetails)
            return res.status(400).json({
                success:false,
                message:'no user is found of given'
            })

        //finding all the friends of that user

        const userChat = await chat.find({users:{$elemMatch:{$eq:id}}})
            .populate("users").exec();

        let result = {
            userDetails:userDetails,
            userChat:userChat
        }

        return res.status(200).json({
            success:true,
            message:'user details fetched successfuly',
            result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'SOmething went wrong'
        })
    }
}