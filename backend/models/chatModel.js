const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // यहां 'User' आपके User मॉडल का name होना चाहिए
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message', // यहां 'Message' आपके Message मॉडल का name होना चाहिए
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // यहां 'User' आपके User मॉडल का name होना चाहिए
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;