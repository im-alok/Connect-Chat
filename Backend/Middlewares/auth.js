const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,res,next)=>{
    try {
        const token = req.body.token 
                                    ||req.cookies.token 
                                    || req.header("Authorization").replace('Bearer',"");
        if(!token){
            res.status(404).json({
                success:false,
                message:'token is missing'
            })
        }
        
        //verifying the token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        next();
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error while validating the token'
        })
    }
}