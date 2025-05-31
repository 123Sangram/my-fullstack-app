const jwt = require('jsonwebtoken');
const farmerModel = require('../models/userModel');

/**
 * Middleware to verify JWT token for authentication
 */
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.farmerId) {
      // For farmer authentication
      const farmer = await farmerModel.findById(decoded.farmerId).select('-password');
      
      if (!farmer) {
        return res.status(404).json({ success: false, message: 'Farmer not found' });
      }
      
      req.user = farmer;
    } else if (decoded.id) {
      // For regular user authentication
      const user = await farmerModel.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      req.user = user;
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token structure' });
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

//  authentication for fetch





module.exports = auth;
 