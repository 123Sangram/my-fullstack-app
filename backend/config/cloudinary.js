const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

// Ensure environment variables are loaded with correct path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectCloudinary = async () => {
    try {
        // Default values if environment variables are not set
        const cloudName = process.env.CLOUDINARY_NAME || "dn03jiyfd";
        const apiKey = process.env.CLOUDINARY_API_KEY || "499521819278348";
        const apiSecret = process.env.CLOUDINARY_SECRET_KEY || "KkpTodAgZv-jb9zrJBfclvvqiOk";
        
        // Log values for debugging
        console.log("Cloudinary Config:", {
            cloud_name: cloudName,
            api_key: apiKey ? "Set (masked)" : "(not set)",
            api_secret: apiSecret ? "Set (masked)" : "(not set)"
        });
        
        // Configure cloudinary with values
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });
        
        console.log('Cloudinary configured successfully');
        return true;
    } catch (error) {
        console.error('Cloudinary configuration error:', error);
        return false;
    }
};

module.exports = connectCloudinary;