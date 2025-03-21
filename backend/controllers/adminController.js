const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const farmerModel = require('../models/userModel');
const fs = require('fs');
const Message = require('../models/messageModel');
const Farmer = require('../models/userModel');

const addFarmer = async (req, res) => {
  try {
    console.log("Registration request body:", req.body);
    console.log("Registration request file:", req.file);
    
    const { name, email, password, phone, landSize, cropType, experience, address } = req.body;
    const image = req.file;

    // Check for missing fields
    if (!name || !email || !password || !phone || !landSize || !cropType || !experience || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check if email already exists
    const existingFarmer = await farmerModel.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Default image URL in case Cloudinary upload fails
    let imageUrl = "https://res.cloudinary.com/dn03jiyfd/image/upload/v1618586815/default-user_nj7bkx.png";

    // Try to upload to Cloudinary if image is provided
    if (image) {
      try {
        console.log("Attempting to upload image to Cloudinary...");
        console.log("Image path:", image.path);
        
        const imageUpload = await cloudinary.uploader.upload(image.path, {
          folder: "farmer_images",
          resource_type: "image",
        });

        console.log("Cloudinary upload successful:", imageUpload.secure_url);
        imageUrl = imageUpload.secure_url;
        
        // Remove the uploaded file from local storage
        fs.unlink(image.path, (err) => {
          if (err) console.error('Error deleting local file:', err);
        });
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        console.log("Proceeding with default image URL");
        // Continue with registration using default image
      }
    }

    // Create new farmer object
    const newFarmer = new farmerModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      phone,
      landSize,
      cropType,
      experience,
      address,
      date: Date.now(),
    });

    // Save farmer to the database
    await newFarmer.save();
    console.log("Farmer saved to database:", newFarmer._id);

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { farmerId: newFarmer._id, email: newFarmer.email },
      process.env.JWT_SECRET || 'greatstack',
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      success: true, 
      message: "Farmer registered successfully",
      token,
      farmer: {
        id: newFarmer._id,
        name: newFarmer.name,
        email: newFarmer.email,
        image: newFarmer.image
      }
    });
  } catch (error) {
    console.error("Error in addFarmer:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message || "Unknown error"
    });
  }
};

// Farmer login
const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", { email });

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find farmer by email
    const farmer = await farmerModel.findOne({ email });
    if (!farmer) {
      console.log("No farmer found with email:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    console.log("Farmer found:", farmer.name);

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, farmer.password);
    console.log("Password validation result:", isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { farmerId: farmer._id, email: farmer.email },
      process.env.JWT_SECRET || 'greatstack',
      { expiresIn: '1d' }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        image: farmer.image
      }
    });

  } catch (error) {
    console.error("Error in loginFarmer:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all users (farmers and buyers)
const getUsers = async (req, res) => {
  try {
    const users = await farmerModel.find({}, 'name email image role latitude longitude');
    
    if (!users) {
      return res.status(404).json({ 
        success: false, 
        message: 'No users found' 
      });
    }
    
    const formattedUsers = users.map(user => ({
      _id: user._id,
      name: user.name || 'Unknown User',
      email: user.email,
      image: user.image || null,
      role: user.role || 'Farmer',
      latitude: user.latitude || (20.5937 + (Math.random() - 0.5) * 0.1),
      longitude: user.longitude || (78.9629 + (Math.random() - 0.5) * 0.1)
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    const message = new Message({
      senderId,
      receiverId,
      content
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single farmer
const getFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).select('-password');
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a farmer
const updateFarmer = async (req, res) => {
  try {
    const updates = req.body;
    const farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    // Update fields
    Object.keys(updates).forEach(update => {
      farmer[update] = updates[update];
    });

    await farmer.save();
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a farmer
const deleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    await farmer.remove();
    res.json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all farmers
const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find().select('-password');
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFarmer,
  loginFarmer,
  loginAdmin,
  getFarmer,
  updateFarmer,
  deleteFarmer,
  getAllFarmers,
  getUsers,
  sendMessage,
  getMessages
};