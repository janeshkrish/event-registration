// server/controllers/eventController.js
const Event = require('../models/Event');

const createEvent = async (req, res, next) => {
  try {
    console.log('Received request body for creating event:', req.body); // <-- ADD THIS LINE

    const { title, description, date, location, imageUrl, category, capacity, organiser, contactEmail } = req.body; // Adjusted to common event fields

    // Basic validation (you might have Mongoose schema validation too)
    if (!title || !description || !date || !location || !category || !capacity || !organiser || !contactEmail) {
      // You should create a custom error for this or let Mongoose validation handle it
      return res.status(400).json({ message: 'Please provide all required event fields.' });
    }

    const event = new Event({
      title,
      description,
      capacity,
      type,
      date,
      time,
      location,
      capacity,
      price,
      tags,
      imageUrl,
      organizer,
      createdAt,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Error in createEvent controller:', error); // <-- ADD THIS LINE for specific controller debugging
    next(error); // Pass error to global error handler
  }
};

module.exports = { createEvent };