const express = require('express');
const router = express.Router();
const {auth} = require('../Middlewares/auth');

const {searchUser, createChat, fetchChats, createGroupChat, getAllGroupChat, renameGroup, removeFromGroup, addToGroup} = require('../controllers/Chat');
router.get('/findusers',auth,searchUser);
router.post('/createchat',auth,createChat);
router.get('/fetchchat',auth,fetchChats);
router.post('/creategroupchat',auth,createGroupChat);
router.get('/getallgroupchat',auth,getAllGroupChat);
router.put('/renamegroup',auth,renameGroup);
router.put('/removefromgroup',auth,removeFromGroup);
router.put('/addtogroup',auth,addToGroup);

module.exports=router;