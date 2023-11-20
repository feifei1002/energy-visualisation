const User = require('../models/User');
const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const PendingUser = require("../models/PendingUser");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash

// Controller function for registering a new user
const registerNewUser = async (req, res) => {
    try {
        // Destructure user data from the request body
        const { fullName, username, password, email } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance with the hashed password
        const newUser = new PendingUser({
            fullName,
            username,
            password: hashedPassword,
            email,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        // Handle registration errors
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};

// Export the registerNewUser function for use in other modules
module.exports = { registerNewUser };


