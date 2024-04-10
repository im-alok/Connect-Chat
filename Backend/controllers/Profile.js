const profile = require('../Model/Profile');
const user = require('../Model/User');
const bcrypt = require('bcrypt');
const cloudinaryFileUpload = require('../utils/fileupload');

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
        console.log('cloud upload done and saving to dataBAse');
        const userDetails = await user.findByIdAndUpdate(userId,{image:uploadDetails.secure_url},{new:true}).populate('additionalDetails');

        userDetails.password = undefined;
        userDetails.resetPasswordToken = undefined;
        userDetails.tokenExpiresIn = undefined;

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