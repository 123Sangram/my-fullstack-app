

const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  phone: { type: String, required: true },
  landSize: { type: String, required: true },
  cropType: { type: String, required: true },
  experience: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Number, required: true },
}, { minimize: false });

const farmerModel = mongoose.models.farmer || mongoose.model('Farmer', farmerSchema);

module.exports = farmerModel;