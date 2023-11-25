// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the AdminUser model
const adminUserSchema = new mongoose.Schema({
    // Full name of the web admin user
    fullName: {
        type: String,
        required: true
    },
    // Unique username for the web admin user
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Password for the web admin user
    password: {
        type: String,
        required: true
    },
    // Unique email address for the web admin user
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Create a Mongoose model named 'AdminUser' based on the defined schema
const AdminUser = mongoose.model('adminUser', adminUserSchema, 'WebAdmin');

// Export the AdminUser model for use in other modules
module.exports = AdminUser;