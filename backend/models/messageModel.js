const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    senderType: {
      type: String,
      enum: ['farmer', 'buyer', 'admin'],
      default: 'farmer'
    },
    receiverType: {
      type: String,
      enum: ['farmer', 'buyer', 'admin'],
      default: 'buyer'
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Message;