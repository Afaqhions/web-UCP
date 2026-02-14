// models/Competition.js
const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 2000
  },
  summary: {
    type: String,
    maxlength: 200
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  rules: [{
    type: String,
    maxlength: 500
  }],
  prizes: [{
    place: String,
    amount: String,
    description: String
  }],
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return v > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  registrationDeadline: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return v <= this.startDate;
      },
      message: 'Registration deadline must be before start date'
    }
  },
  maxRegistrations: { 
    type: Number, 
    min: 1,
    required: true 
  },
  currentRegistrations: { 
    type: Number, 
    default: 0,
    min: 0,
    validate: {
      validator: function(v) {
        return v <= this.maxRegistrations;
      },
      message: 'Current registrations cannot exceed max registrations'
    }
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'completed', 'cancelled'], 
    default: 'draft' 
  },
  image: {
    type: String,
    default: 'default-competition.jpg'
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  tags: [String],
  location: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    default: 'online'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: Date
}, { timestamps: false });

// Indexes
competitionSchema.index({ title: 'text', description: 'text' });
competitionSchema.index({ category: 1, status: 1 });
competitionSchema.index({ startDate: 1, endDate: 1 });
competitionSchema.index({ currentRegistrations: -1 });

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
