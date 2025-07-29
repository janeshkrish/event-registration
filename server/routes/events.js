const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Import authentication middleware

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (requires authentication)
router.post(
    '/',
    [
        auth, // Apply authentication middleware
        body('title', 'Title is required').not().isEmpty(),
        body('description', 'Description is required').not().isEmpty(),
        body('category', 'Category is required').not().isEmpty(),
        body('type', 'Event type is required').not().isEmpty(),
        body('date', 'Date is required and must be a valid date').isISO8601().toDate(),
        body('time', 'Time is required').not().isEmpty(),
        body('location', 'Location is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, category, type, date, time, location, capacity, price, tags, imageUrl } = req.body;

        try {
            const newEvent = new Event({
                title,
                description,
                category,
                type,
                date,
                time,
                location,
                capacity: capacity || null, // Handle optional capacity
                price: price || 0, // Handle optional price
                tags: tags ? tags.split(',').map(tag => tag.trim()) : [], // Split comma-separated tags
                imageUrl: imageUrl || 'https://via.placeholder.com/400x200?text=Event+Image', // Use provided URL or default
                organizer: req.user.id // Get organizer ID from authenticated user
            });

            const event = await newEvent.save();
            res.status(201).json(event); // Send back the created event
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1, time: 1 }); // Sort by date and time
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        console.error(err.message);
        // This handles cases where the ID format is invalid
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});


module.exports = router;