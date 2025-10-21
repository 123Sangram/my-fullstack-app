const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "MONGODB_URI=mongodb+srv://sangramamvan_db_user:GS2aRolYpsK5ts9O@cluster0.rkad4ob.mongodb.net/Farming";
        
        console.log("MongoDB connecting with URI:", uri);
        mongoose.connection.on('connected', () => console.log("MongoDB database connected successfully"));
        const conn = await mongoose.connect(uri);
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        return false;
    }
}

module.exports = connectDB;
