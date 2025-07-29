const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// CORS configuration (ensure this matches your frontend's port!)
app.use(cors({
    origin: 'http://localhost:8080', // Your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Add 'x-auth-token' to the list of allowed headers
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'] 
}));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Simple root route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// GLOBAL ERROR HANDLING MIDDLEWARE
// This should be the last middleware added.
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR HANDLER CAUGHT AN ERROR:');
    console.error(err.stack); // Log the full stack trace for debugging
    res.status(500).json({ msg: 'Server Error: An unexpected error occurred.' });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));