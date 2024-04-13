const profile = require('../Model/Profile');
const user = require('../Model/User');
const bcrypt = require('bcrypt');
const cloudinaryFileUpload = require('../utils/fileupload');
const Group = require('../Model/Group');

exports.updateProfile = async(req,res) =>{
    try {
        const {dob, gender,contact,about} = req.body;
        if(!dob || !gender || !contact || !about){
            return res.status(400).json({
                success:false,
                message:'all fields are required'
            })
        }
        const userId = req.user.id;

        const userDetails = await user.findById(userId);
        const additionalDetails =  await profile.findById(userDetails.additionalDetails);

        additionalDetails.dob = dob;
        additionalDetails.gender = gender;
        additionalDetails.Bio= about;
        additionalDetails.phoneno=contact;

        await additionalDetails.save();

        const updatedUserDetails = await user.findById(userId)
            .populate('additionalDetails');
            // console.log(updatedUserDetails)

        return res.status(200).json({
            success:true,
            message:'profile updated successfully',
            updatedUserDetails
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

exports.changePassword = async(req,res)=>{
    // console.log(req.body);
    try {
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(404).json({
                success:false,
                message:'all fields are required'
            })
        }

        const userId = req.user.id;

        const userDetails = await user.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'user data is not available'
            })
        }
        // console.log(await bcrypt.compare(oldPassword,userDetails.password))

        //compare the password
        if(!await bcrypt.compare(oldPassword,userDetails.password)){
            return res.status(400).json({
                success:false,
                message:'old password does not match'
            })
        }

        //else hash the password and update the db
        const hashPassword = await bcrypt.hash(newPassword,10);

        //update the db
        userDetails.password = hashPassword;
        await userDetails.save();

        return res.status(200).json({
            success:true,
            message:'password updated successfully'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).josn({
            success:false,
            message:'Something went wrong'
        })
    }
}

exports.imageUpload = async(req,res)=>{
    // console.log(req.body)
    try {
        //getting the id
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"USer id is not found"
            })
        }
        //getting the image file
        const imageFile = req.files.imageFile;
        if(!imageFile){
            return res.status(404).json({
                success:false,
                message:"No image file is founded"
            })
        }

        console.log('uploading to cloudinary');
        const uploadDetails = await cloudinaryFileUpload(imageFile,process.env.FOLDER);
        // console.log(uploadDetails);
        //updating entry in the dataBase
        // console.log('cloud upload done and saving to dataBAse');
        const userDetails = await user.findByIdAndUpdate(userId,{profilepic:uploadDetails.secure_url},{new:true}).populate('additionalDetails');

        userDetails.password = undefined;
        // userDetails.resetPasswordToken = undefined;
        // userDetails.tokenExpiresIn = undefined;

        return res.status(200).json({
            success:true,
            message:"Image uploaded Sucessfully",
            userDetails
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.uploadGroupImage = async(req,res) =>{
    
    try {
        //getting the id
        const userId = req.user.id;
        const groupId = req.body.groupId;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"USer id is not found"
            })
        }

        if(!groupId){
            return res.status(404).json({
                success:false,
                message:'group id is required'
            })
        }

        const groupDetails = await Group.findById(groupId);

        if(groupDetails.groupAdmin != userId){
            return res.status(400).json({
                success:false,
                message:'only admin is allowed to make the changes'
            })
        }

        //getting the image file
        const imageFile = req.files.imageFile;
        if(!imageFile){
            return res.status(404).json({
                success:false,
                message:"No image file is founded"
            })
        }

        // console.log('uploading to cloudinary');
        const uploadDetails = await cloudinaryFileUpload(imageFile,process.env.FOLDER);
        // console.log(uploadDetails);
        //updating entry in the dataBase
        // console.log('cloud upload done and saving to dataBAse');
        const groupUpdatedDetails = await Group.findByIdAndUpdate(groupId,{profilepic:uploadDetails.secure_url},{new:true});


        return res.status(200).json({
            success:true,
            message:"Group Image uploaded Sucessfully",
            groupUpdatedDetails
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.LogOutHandler = async(req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(400).jsjon({
                success:false,
                message:'user id is not founds'
            })
        }

        //finding user details
        const userDetails = await user.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'userDetails not found'
            })
        }

        const updateUserStatus = await user.findByIdAndUpdate(userId,{status:false});

        return res.status(200).json({
            success:true,
            message:'Log out successfully'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'someting went wrong'
        })
    }
}