const express = require('express');
const router = express.Router();


const { login, signup, sendOtp } = require('../controllers/Auth');
const { resetPasswordToken, updatePassword } = require('../controllers/forgetPassword');

router.post('/login',login);
router.post('/signup',signup);
router.post('/verify-email',sendOtp);
router.post('/resetpasswordtoken',resetPasswordToken);
router.put('/resetpassword',updatePassword)

module.exports=router;