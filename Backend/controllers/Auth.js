const user = require('../Model/User');
const otp = require('../Model/OTP');
const bcrypt = require('bcrypt');
const Profile = require('../Model/Profile');
const otpGenerator=require('otp-generator');
const jwt= require('jsonwebtoken');
require('dotenv').config()

exports.sendOtp = async (req,res)=>{
    try {
        const {email}= req.body;
        if(!email){
            return res.status(400).json({
                success:false,
                message:'Email is required'
            })
        }

        // check for existing user
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User Already Resgister"
            })
        }

        const otpValue = otpGenerator.generate(4,
            {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });

        // check if duplicate otp is present there or not
        const duplicateOtp = await otp.findOne({otpValue:otpValue});
        while(duplicateOtp){
            otpValue = otpGenerator.generate(4,
                {
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false
                });

            duplicateOtp = await otp.findOne({otpValue:otpValue});
        }

        // create entry to the data base
        const otpDetails = await otp.create({email:email,otpValue:otpValue});
        
        return res.status(200).json({
            success:true,
            message:'OTP send Successfully',
            otpDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server Down'
        })
    }
}

exports.login = async(req,res)=>{
    try {
        //fetching the data
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(404).json({
                success:false,
                message:'All fields are required'
            })
        }
        //check whether the user is register or not
        const userDetails = await user.findOne({username:username}).populate('additionalDetails');

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:'User is not register kindly signup'
            })
        }

        //matching the password and send the jwt token
        if(await bcrypt.compare(password,userDetails?.password,)){
            //creating payloads
            const payloads ={
                username:username,
                email:email,
                id:userDetails._id
            }
            //generating the jwt token
            const token =  jwt.sign(payloads,process.env.JWT_SECRET,{expiresIn:'24h'})

            userDetails.token = token;
            userDetails.password = null;
            return res.status(200).json({
                success:true,
                message:'user logged in successfully',
                userDetails,
                token
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal Server Down"
        })
    }
}

exports.signup = async(req,res)=>{
    try {
        //fetch the data
        const {username,name,email,password,otpValue} = req.body;
        email = email.toLowerCase();

        //validate the user
        if(!username || !name || !email || !password){
            return res.status(404).json({
                success:false,
                message:"all fields are required"
            })
        }

        //check if username are unique or not
        const userDetails = await user.findOne({username:username});
        if(userDetails){
            return res.status(400).json({
                success:false,
                message:'username is not available'
            })
        }

        //check if user are already register
        const existingUser = await user.findOne({email:email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'user is already register'
            })
        }

        //check for otp
        const otpDetails = await otp.findOne({email:email}).sort({createdAt:-1}).limit(1);

        if(!otpDetails){
            return res.status(400).json({
                success:false,
                message:'please send otp then come back'
            })
        }

        //check for otp validation
        if(otpValue === otpDetails.otpValue){
            //hashing the password
            const image = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
            const hashPassword = await bcrypt.hash(password,10);
            const additionalDetails = await Profile.create({
                Bio:null,
                dob:null,
                gender:null,
                phoneno:null,
            })

            //create entry to the db
            const userDetails = await user.create({
                email:email,
                name:name,
                username:username,
                password:hashPassword,
                profilepic:image,
                additionalDetails: additionalDetails._id
            })

            if(userDetails){
                return res.status(200).json({
                    success:true,
                    message:'user register successfully'
                })
            }

        }

        
        return res.status(400).json({
            success:false,
            message:'kindly enter correct otp'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server Down'
        })
    }
}