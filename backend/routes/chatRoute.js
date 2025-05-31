const express = require('express');
const router = express.Router();
const { getAllUsers, getMessages, sendMessage } = require('../controllers/chatController');
const auth = require('../middleware/auth');

// Apply auth middleware to each route individually for better control
router.get('/users',  getAllUsers);
router.get('/messages',  getMessages);
router.post('/send', sendMessage);

module.exports = router; 