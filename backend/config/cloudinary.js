

const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs')


dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({ 
  cloud_name: "dn03jiyfd", 
  api_key: "367133515896235", 
  api_secret: "BO3VNCrOjEg8U419nMpX2kvV2ac" 
});

const connectCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error("Cloudinary upload failed:", error); 
        fs.unlinkSync(localFilePath)
        return null;
    }
}



module.exports = connectCloudinary;
