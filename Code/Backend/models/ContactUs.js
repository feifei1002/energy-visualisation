// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Contact Us data model
const contactUsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// Create a Mongoose model named 'Contact Us' based on the defined schema
const ContactUs = mongoose.model('contactUs', contactUsSchema, 'contactUs');

// Export the Contact Us model for use in other modules
module.exports = ContactUs;