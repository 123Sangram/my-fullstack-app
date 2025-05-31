// const verifyToken = async (req, res) => {
//   try {
//     // User is already verified by auth middleware
//     const user = req.user;
    
//     // Return user data
//     res.json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         userType: user.userType,
//         // Add other needed user fields
//       }
//     });
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     res.status(401).json({
//       success: false,
//       message: 'Token verification failed'
//     });
//   }
// };

// module.exports = {
//   // ... existing exports
//   verifyToken
// }; 
// const verifyToken = async (req, res) => {
//   try {
//     // User is already verified by auth middleware
//     const user = req.user;
    
//     // Return user data
//     res.json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         userType: user.userType,
//         // Add other needed user fields
//       }
//     });
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     res.status(401).json({
//       success: false,
//       message: 'Token verification failed'
//     });
//   }
// };

// // Add to exports
// module.exports = {
//   // ... existing exports
//   verifyToken
// };