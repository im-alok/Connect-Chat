const user = require('../Model/User');
const mailSender = require('../config/mailSender');
const userInteraction = require('../mailTemplate/userInteraction');

exports.sendUserEmail = async (req,res)=>{
    try {
        const AllUser =await user.find({});
        //sendEmail\
        AllUser.forEach((user)=>{
            const response = mailSender(user.email,`ConnectChat is live Now 🔥` ,userInteraction())
        })

        // const asn = await mailSender('alokramranjan@gmail.com',`ConnectChat is live Now 🔥` ,userInteraction())
        
        // console.log(asn)

        return res.status(200).json({
            success:true,
            message:'mail send successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}