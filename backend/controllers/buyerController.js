const Buyer = require('../models/buyerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const registerBuyer = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    const { 
      name, 
      email, 
      password, 
      phone, 
      companyName, 
      address,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    // Check if buyer already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    let imageUrl = null;
    if (req.file) {
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'buyer_images',
          resource_type: 'auto'
        });
        imageUrl = result.secure_url;
        
        // Clean up the uploaded file
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting local file:', err);
        });
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
      }
    }

    // Parse address
    let parsedAddress = {};
    try {
      parsedAddress = address ? JSON.parse(address) : {
        line1: "",
        city: "",
        pincode: ""
      };
    } catch (e) {
      console.error('Error parsing address:', e);
      parsedAddress = {
        line1: address || "",
        city: "",
        pincode: ""
      };
    }

    // Create new buyer
    const newBuyer = new Buyer({
      name,
      email,
      password, // Plain password - will be hashed by pre-save hook
      phone,
      companyName: companyName || '',
      image: imageUrl,
      address: parsedAddress,
      latitude: req.body.latitude || 20.5937,
      longitude: req.body.longitude || 78.9629,
      date: Date.now()
    });

    const savedBuyer = await newBuyer.save();
    console.log('Buyer saved successfully');

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { buyerId: savedBuyer._id, email: savedBuyer.email },
      process.env.JWT_SECRET || 'greatstack',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      message: "Buyer registered successfully",
      token,
      buyer: {
        id: savedBuyer._id,
        name: savedBuyer.name,
        email: savedBuyer.email,
        image: savedBuyer.image,
        companyName: savedBuyer.companyName
      }
    });

  } catch (error) {
    console.error('Error in registerBuyer:', error);
    res.status(500).json({
      success: false,
      message: "Error registering buyer",
      error: error.message
    });
  }
};

const loginBuyer = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find buyer
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, buyer.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { buyerId: buyer._id, email: buyer.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Login successful for:', email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      buyer: {
        id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        image: buyer.image,
        companyName: buyer.companyName
      }
    });

  } catch (error) {
    console.error('Error in loginBuyer:', error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};

const getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find({}, '-password');
    res.status(200).json(buyers);
  } catch (error) {
    console.error('Error in getBuyers:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching buyers",
      error: error.message
    });
  }
};

const updateBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'buyer_images'
      });
      updateData.image = result.secure_url;
    }

    if (updateData.address) {
      updateData.address = JSON.parse(updateData.address);
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedBuyer) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      buyer: updatedBuyer
    });

  } catch (error) {
    console.error('Error updating buyer:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

module.exports = {
  registerBuyer,
  loginBuyer,
  getBuyers,
  updateBuyer
}; 