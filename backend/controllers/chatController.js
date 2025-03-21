const Message = require('../models/messageModel');
const Farmer = require('../models/userModel');
const Buyer = require('../models/buyerModel');

// Get all users (either all farmers or all buyers depending on the requesting user)
const getAllUsers = async (req, res) => {
  try {
    const { userType, userId } = req.query;
    
    console.log("Getting users for:", { userType, userId });
    
    let users = [];
    
    // If the current user is a farmer, fetch all buyers and vice versa
    if (userType === 'farmer') {
      // Current user is farmer, fetch buyers
      users = await Buyer.find({}).select('name email image companyName');
      console.log(`Found ${users.length} buyers for farmer`);
    } else if (userType === 'buyer') {
      // Current user is buyer, fetch farmers
      users = await Farmer.find({}).select('name email image');
      console.log(`Found ${users.length} farmers for buyer`);
    } else {
      console.log("Invalid userType:", userType);
      // Default to showing all users
      const farmers = await Farmer.find({}).select('name email image');
      const buyers = await Buyer.find({}).select('name email image companyName');
      
      users = [...farmers, ...buyers];
      console.log(`Default: Found ${farmers.length} farmers and ${buyers.length} buyers`);
    }
    
    // Format the users with consistent properties
    const formattedUsers = users.map(user => ({
      _id: user._id,
      name: user.name || 'Unknown',
      email: user.email,
      image: user.image || null,
      userType: userType === 'farmer' ? 'buyer' : 'farmer',
      companyName: user.companyName || null
    }));
    
    return res.status(200).json({
      success: true,
      users: formattedUsers
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    
    console.log("Raw query params:", req.query);
    
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender ID and Receiver ID are required"
      });
    }

    // Log the exact IDs being used
    console.log("Getting messages between:", { 
      senderId: senderId.toString(), 
      receiverId: receiverId.toString() 
    });
    
    // Find messages where the current users are either sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: senderId.toString(), receiverId: receiverId.toString() },
        { senderId: receiverId.toString(), receiverId: senderId.toString() }
      ]
    }).sort({ createdAt: 1 });
    
    console.log(`Found ${messages.length} messages between these users`);
    
    return res.status(200).json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message
    });
  }
};

// Send a message to another user
const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content, senderType, receiverType } = req.body;
    
    console.log("Message request body:", req.body);
    
    // Enhanced validation
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender ID and Receiver ID are required"
      });
    }
    
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Message content is required and cannot be empty"
      });
    }
    
    console.log("Sending message:", { 
      senderId: senderId.toString(), 
      receiverId: receiverId.toString(), 
      contentLength: content?.length, 
      senderType, 
      receiverType 
    });
    
    // Create a new message
    const newMessage = new Message({
      senderId: senderId.toString(),
      receiverId: receiverId.toString(),
      content,
      timestamp: new Date(),
      senderType: senderType || 'farmer',
      receiverType: receiverType || 'buyer'
    });
    
    // Save the message
    const savedMessage = await newMessage.save();
    
    if (!savedMessage) {
      throw new Error('Failed to save message to database');
    }
    
    console.log("Message saved successfully:", savedMessage._id);
    
    // Try to emit the message through socket if available
    try {
      if (req.app.get('io')) {
        req.app.get('io').emit('receive_message', savedMessage);
        console.log("Message emitted through socket");
      }
    } catch (socketError) {
      console.error("Socket emission failed but message was saved:", socketError);
      // We don't want to fail the API call if only the socket fails
    }
    
    return res.status(201).json({
      success: true,
      message: savedMessage
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getMessages,
  sendMessage
}; 