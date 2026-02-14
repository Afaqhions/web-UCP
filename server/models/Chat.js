// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  admin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  messages: [{
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      maxlength: 1000 
    },
    attachments: [{
      url: String,
      type: { type: String, enum: ['image', 'document', 'file'] },
      name: String,
      size: Number
    }],
    timestamp: { 
      type: Date, 
      default: Date.now 
    },
    read: { 
      type: Boolean, 
      default: false 
    },
    delivered: {
      type: Boolean,
      default: false
    },
    isAI: {
      type: Boolean,
      default: false
    }
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isEscalated: { 
    type: Boolean, 
    default: false 
  },
  aiContext: {
    type: String,
    maxlength: 1000
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  unreadCount: {
    type: Number,
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: false });

// Indexes
chatSchema.index({ user: 1, isActive: 1 });
chatSchema.index({ admin: 1, isActive: 1 });
chatSchema.index({ updatedAt: -1 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
