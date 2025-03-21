const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { verifyToken } = require('../controllers/authController');

// Add verify route
router.get('/verify', auth, verifyToken);

// ... other routes

module.exports = router;