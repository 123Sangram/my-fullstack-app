const mongoose = require('mongoose'); //library
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        // Fallback to hardcoded URI if environment variable is not available
        const uri = process.env.MONGODB_URI || "mongodb+srv://hello:gxxWbMG2ASTP7FLj@cluster0.utxpy.mongodb.net/Krishanjh";
        
        // Log the URI for debugging
        console.log("MongoDB connecting with URI:", uri);
        
        // MongoDB connection event
        mongoose.connection.on('connected', () => console.log("MongoDB database connected successfully"));
        
        // Connect to MongoDB
        const conn = await mongoose.connect(uri);
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        return false;
    }
}

module.exports = connectDB;
