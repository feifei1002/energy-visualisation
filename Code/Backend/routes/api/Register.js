// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const PendingUser = require('../../models/PendingUser'); // Import PendingUser model
const RegisterController = require('../../controllers/RegisterController'); // Import RegisterController
const User = require("../../models/User"); // Import User model
const { expressjwt } = require("express-jwt");

// The key for the jwt token to prevent unauthorized access
const secretKey = process.env.ACCESS_TOKEN;

// Middleware to check the validity of the JWT token
const checkToken = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: function (req) {
        // Extract token from authorization header or query parameter
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
});

// Route to check server status
router.get('/register', (req, res) => {
    res.send('Server is running. /api/register endpoint is accessible.');
});

// Route to handle user registration
router.post('/register', RegisterController.registerNewUser);

// Route to fetch pending users (requires token for authorization)
router.get('/pending-users', checkToken, async (req, res) => {
    try {
        // Fetch pending users with approval status as false
        const pendingUsers = await PendingUser.find({ approved: false });
        res.json(pendingUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching pending user data.' });
    }
});

// Route to approve or deny a user based on their ID (requires token for authorization)
router.post('/approve-user/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;
    const { approved } = req.body;

    try {
        // Update the approval status in the PendingUser schema
        await PendingUser.findByIdAndUpdate(userId, { approved });

        // If approved, move the user to the User schema
        if (approved) {
            const pendingUser = await PendingUser.findById(userId);

            if (pendingUser) {
                // Create a new User based on the pending user's details
                const newUser = new User({
                    fullName: pendingUser.fullName,
                    username: pendingUser.username,
                    email: pendingUser.email,
                    password: pendingUser.password,
                });

                // Save the new User
                await newUser.save();

                // Remove the pending user from the PendingUser schema
                await PendingUser.findByIdAndRemove(userId);
            }
        }

        res.json({ message: 'User approval status updated.' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Error approving user. Please try again.' });
    }
});

// Route to deny a user based on their ID (requires token for authorization)
router.post('/deny-user/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;

    try {
        // Remove the pending user from the PendingUser schema
        await PendingUser.findByIdAndRemove(userId);

        res.json({ message: 'User denial status updated.' });
    } catch (error) {
        console.error('Error denying user:', error);
        res.status(500).json({ message: 'Error denying user. Please try again.' });
    }
});

// Export the router
module.exports = router;
