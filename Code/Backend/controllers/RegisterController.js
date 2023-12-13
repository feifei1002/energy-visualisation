// RegisterController.js

// Import required libraries and modules
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');
const PendingUser = require('../models/PendingUser');

// Number of salt rounds for bcrypt hashing
const saltRounds = 10;

// Define the schema for user registration
const registerSchema = Joi.object({
    fullName: Joi.string().required(),  // Full name is required
    username: Joi.string().required(),  // Username is required
    email: Joi.string().email().required(),  // Email must be a valid email address and is required
    password: Joi.string().required(),  // Password is required
});

// Function to register a new user
const registerNewUser = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = registerSchema.validate(req.body);

        // If validation fails, send an error response
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extract user details from the request body
        const { fullName, username, password, email } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new PendingUser instance with hashed password
        const newUser = new PendingUser({ fullName, username, password: hashedPassword, email });

        // Save the new PendingUser to the database
        await newUser.save();

        return res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    // Check if token is present in the request header
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

// Export the functions for use in other files
module.exports = { registerNewUser, verifyToken };
