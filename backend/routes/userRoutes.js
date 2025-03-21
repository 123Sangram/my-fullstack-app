const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getProfile,
  updateProfile,
  getAllUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, getAllUsers);

module.exports = router;