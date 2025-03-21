const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    companyName: {
        type: String,
        trim: true,
        default: ''
    },
    address: {
        line1: { type: String, default: '' },
        city: { type: String, default: '' },
        pincode: { type: String, default: '' }
    },
    latitude: {
        type: Number,
        default: 20.5937
    },
    longitude: {
        type: Number,
        default: 78.9629
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Password matching method
buyerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password
buyerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Buyer = mongoose.models.Buyer || mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
