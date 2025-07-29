const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    console.log('Received signup request.'); // ADD THIS
    const { fullName, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('Signup: User already exists for email:', email); // ADD THIS
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            fullName,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Signup: User saved to DB:', user.email); // ADD THIS

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Signup: Error signing JWT:', err); // ADD THIS
                    throw err; // Re-throw to be caught by global error handler
                }
                console.log('Signup: Token generated for user:', user.email); // ADD THIS
                res.json({ token });
            }
        );

    } catch (err) {
        console.error('Signup Route Catch Block Error:'); // ADD THIS
        console.error(err); // Log the full error object for better detail
        res.status(500).send('Server Error'); // This sends the plain text, global handler sends JSON
    }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', async (req, res) => {
    console.log('Received signin request.'); // ADD THIS
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            console.log('Signin: User not found for email:', email); // ADD THIS
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Signin: Password mismatch for email:', email); // ADD THIS
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Signin: Error signing JWT:', err); // ADD THIS
                    throw err;
                }
                console.log('Signin: Token generated for user:', user.email); // ADD THIS
                res.json({ token });
            }
        );

    } catch (err) {
        console.error('Signin Route Catch Block Error:'); // ADD THIS
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;