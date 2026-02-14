// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  competition: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Competition', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'attended'], 
    default: 'pending' 
  },
  registeredAt: { 
    type: Date, 
    default: Date.now 
  },
  confirmedAt: Date,
  confirmedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  cancelledAt: Date,
  cancellationReason: String,
  notes: {
    type: String,
    maxlength: 500
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  teamMembers: [{
    name: String,
    email: String,
    phone: String
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: false });

// Compound index to prevent duplicate registrations
registrationSchema.index({ user: 1, competition: 1 }, { unique: true });
registrationSchema.index({ status: 1 });
registrationSchema.index({ competition: 1, status: 1 });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
