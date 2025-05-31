// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');

// // Add user verification route
// router.get('/user', auth, async (req, res) => {
//   try {
//     // req.user is set by auth middleware
//     const user = await User.findById(req.user.id).select('-password');
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// });

// // ... other auth routes ... 