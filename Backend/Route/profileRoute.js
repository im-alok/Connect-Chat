const express = require('express');
const router = express.Router();

const {auth} = require('../Middlewares/auth');
const { updateProfile, changePassword, imageUpload, uploadGroupImage } = require('../controllers/Profile');

router.put('/updateprofiledetails',auth,updateProfile);
router.put('/updatePassword',auth,changePassword);
router.put('/imageupload',auth,imageUpload);
router.put('/groupimageupdate',auth,uploadGroupImage);

module.exports =  router