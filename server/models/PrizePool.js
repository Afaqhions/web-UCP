const mongoose = require('mongoose');

const prizePoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a pool name'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
        default: 0
    },
    sponsor: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Allocated', 'Pending', 'Distributed'],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PrizePool', prizePoolSchema);
