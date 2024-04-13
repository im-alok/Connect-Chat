const express = require('express');
const { findFriendDetails } = require('../controllers/user');
const router = express.Router();
const {auth} = require('../Middlewares/auth');
const { getGroupDetails } = require('../controllers/Chat');

router.get('/friendDetails',auth,findFriendDetails);
router.get('/getGroupDetails',auth,getGroupDetails);

module.exports=router;