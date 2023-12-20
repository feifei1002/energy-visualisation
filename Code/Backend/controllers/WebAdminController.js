// Import necessary modules and packages
const AdminUser = require('../models/AdminUser');
const express = require("express");
const bodyParser = require("body-parser");

// Create an instance of the Express application
const app = express();

// Middleware setup to handle request data in JSON and URL-encoded formats
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import additional packages for password hashing and JWT authentication
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Handle the web admin login request
const postWebAdminLogin = async (req, res) => {
    // Extract user input data from the request body
    const data = req.body;

    try {
        // Find a web admin user in the database based on the provided username
        const webAdmin = await AdminUser.findOne({ username: data.username });

        // If the user is not found, return an error response
        if (!webAdmin) {
            console.error('Username or password does not match any in the system');
            return res.status(401).send('Username or password is incorrect');
        }

        // Compare the provided password with the hashed password in the database
        const comparison = await bcrypt.compare(String(data.password), webAdmin.password);

        // If the password is correct, generate and send an access token
        if (comparison) {
            const accessToken = jwt.sign({ username: data.username, role: "webadmin"}, process.env.ACCESS_TOKEN, { expiresIn: '30m' });
            res.json({ user: data.username, role: "webadmin", token: accessToken });
        } else {
            // If the password is incorrect, return an error response
            console.error('Username or password does not match any in the system');
            res.status(401).send('Username or password is incorrect');
        }
    } catch (error) {
        // Handle errors that may occur during the login process
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Export the postWebAdminLogin function for use in other modules
module.exports = { postWebAdminLogin };