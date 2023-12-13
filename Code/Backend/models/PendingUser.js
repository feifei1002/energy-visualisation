// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for pending user data
const pendingUserSchema = new mongoose.Schema({
    // Full name of the user
    fullName: {
        type: String,
        required: true
    },
    // Unique username for the user
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Password for the user
    password: {
        type: String,
        required: true
    },
    // Unique email address for the user
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Approval status (default is false)
    approved: {
        type: Boolean,
        default: false
    }
});

// Create a mongoose model named 'PendingUser' using the defined schema
const PendingUser = mongoose.model('PendingUser', pendingUserSchema, 'pendingUser');

// Export the PendingUser model for use in other files
module.exports = PendingUser;
