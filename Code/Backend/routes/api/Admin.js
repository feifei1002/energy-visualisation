// Import required libraries and modules
const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/AdminUser');
const User = require('../../models/User');
const WebAdminController = require('../../controllers/WebAdminController');
const bodyParser = require("body-parser");
const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// The key for the jwt token to prevent unauthorized access
const secretKey = process.env.ACCESS_TOKEN;
// The number of salts rounds to hash the new password on reset
const saltRounds = 10;

// Middleware to check JWT token of user for accessing protected routes
const checkToken = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
});

// Fetch all web admin user details, protected using JWT token
router.get('/webadmin', checkToken, async (req, res) => {
    try {
        const webAdminUser = await AdminUser.find();
        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

// Fetch the specific webAdmin user, protected using JWT token
router.get('/webadmin/:id', checkToken, async (req, res) => {
    let webAdminUserId;

    if (req.params.id === '1') {
        webAdminUserId = '655e6a05e0757371ad10394d';
    } else {
        webAdminUserId = req.params.id;
    }

    try {
        const webAdminUser = await AdminUser.findById(webAdminUserId);

        if (!webAdminUser) {
            return res.status(404).json({ message: 'Web Admin user not found.' });
        }

        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

// Get web admin by username, protected using JWT token
router.get('/webadmin/user/:username', checkToken, async (req, res) => {
    try {
        const webAdminUser = await AdminUser.findOne({ username: req.params.username });


        if (!webAdminUser) {
            return res.status(404).json({ message: 'Web Admin user not found.' });
        }

        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

// Fetch all user details, protected using JWT token
router.get('/getallusers', checkToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

// Route to reset a user's password
router.post('/resetpassword', checkToken, async (req, res) => {
    // Extract username and new password from the request body
    const { username, newPassword } = req.body;

    try {
        // Find the user in the database by username
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password using bcrypt for security
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password with the hashed version
        user.password = hashedPassword;

        // Save the updated user model to the database
        await user.save();

        // Respond with a success message
        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        // Handle any errors that may occur during the password reset process
        console.error(error);
        res.status(500).json({ message: 'Error resetting password.' });
    }
});

// Route for web admin login
router.post('/loginwebadmin', WebAdminController.postWebAdminLogin);

// Export the router for use in other modules
module.exports = router;