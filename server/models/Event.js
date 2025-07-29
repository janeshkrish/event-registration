const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: { // In-person, Virtual, Hybrid
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: { // Store as string for simplicity, or Date for full timestamp
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true, // Can be a physical address or a virtual link
        trim: true
    },
    capacity: {
        type: Number,
        default: null // Null for unlimited, or a specific number
    },
    price: {
        type: Number,
        default: 0
    },
    tags: { // Array of strings
        type: [String],
        default: []
    },
    imageUrl: { // URL to the hosted image
        type: String,
        default: 'https://via.placeholder.com/400x200?text=Event+Image' // Placeholder
    },
    organizer: { // Link event to the user who created it
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);