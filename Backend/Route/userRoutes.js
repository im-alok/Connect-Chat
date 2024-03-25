const express = require('express');
const router = express.Router();


const { login, signup, sendOtp } = require('../controllers/Auth');

router.post('/login',login);
router.post('/signup',signup);
router.post('/verify-email',sendOtp);

module.exports=router;