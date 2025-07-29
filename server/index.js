const express = require('express');
const connectDB = require('./db'); // Assuming this connects to your database
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware - Body Parsers with increased limit
app.use(express.json({ limit: '50mb' })); // Handles JSON payloads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Handles URL-encoded form data (good practice)


// CORS configuration
app.use(cors({
    origin: 'http://localhost:8080', // Your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Added PATCH, common for updates
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // Allow common auth headers
    credentials: true // If your frontend sends cookies or authorization headers, you might need this.
}));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Simple root route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// GLOBAL ERROR HANDLING MIDDLEWARE - This should be the last middleware added.
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR HANDLER CAUGHT AN ERROR:');
    console.error(err.stack); // Always log the full stack trace on the server

    // Determine status code (default to 500 if not specified)
    const statusCode = err.statusCode || 500;

    // Send different error details based on environment
    if (process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            message: err.message || 'An unexpected error occurred.',
            error: err, // Send the full error object in development
            stack: err.stack // Send stack trace in development
        });
    } else {
        // For production, send a generic message
        res.status(statusCode).json({
            message: 'Server Error: An unexpected error occurred.'
        });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));