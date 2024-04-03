const express = require('express');
const router = express.Router();

const {auth} = require('../Middlewares/auth');
const { sendMessage, fetchMessage, fetchGroupMessage } = require('../controllers/Message');

router.post('/sendmessage',auth,sendMessage);
router.get('/fetchallmessage',auth,fetchMessage);
router.get('/fetchgroupmessage',auth,fetchGroupMessage);

module.exports = router;