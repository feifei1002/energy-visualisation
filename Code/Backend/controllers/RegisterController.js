const User = require('../models/User');
const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const PendingUser = require("../models/PendingUser");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash

// Controller function for registering a new user
const registerNewUser = async (req, res, next) => {
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

    } catch (error) {
        // Handle registration errors
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Registration failed.' });
    }
};

// const handleApprove = (userId) => {
//     // Send a request to the server to approve the user
//     // Replace '/api/approve-user' with your actual endpoint
//     fetch(`/api/approve-user/${userId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ approved: true }),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.message);
//             toast.success('User approved successfully!');
//             // Optionally, update the local state to remove the approved user from the list
//         })
//         .catch(error => {
//             console.error('Error approving user:', error);
//             toast.error('Error approving user. Please try again.');
//         });
// };
//
// const handleDeny = (userId) => {
//     // Send a request to the server to deny the user
//     // Replace '/api/approve-user' with your actual endpoint
//     fetch(`/api/approve-user/${userId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ approved: false }),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.message);
//             toast.success('User denied successfully!');
//             // Optionally, update the local state to remove the denied user from the list
//         })
//         .catch(error => {
//             console.error('Error denying user:', error);
//             toast.error('Error denying user. Please try again.');
//         });
// };

// Export the registerNewUser function for use in other modules
module.exports = { registerNewUser };



