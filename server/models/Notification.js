// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: {
    type: String,
    enum: ['registration_confirmed', 'competition_reminder', 'chat_message', 'admin_announcement'],
    required: true
  },
  title: String,
  message: String,
  data: mongoose.Schema.Types.Mixed,
  read: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: 2592000 // 30 days TTL
  }
}, { timestamps: false });

// Indexes
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
