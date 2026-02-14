// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  clerkId: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: function () { return !this.oauthProviders?.length && !this.clerkId },
    minlength: 8,
    select: false // Don't return password by default
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  oauthProviders: [{
    provider: { type: String, enum: ['google', 'github'] },
    providerId: String
  }],
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: false });

// Indexes
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
