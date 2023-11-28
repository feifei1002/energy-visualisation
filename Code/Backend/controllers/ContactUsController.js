const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');
const ContactUs = require('../models/ContactUs');

const postContactUs = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = ContactUs.validate(req.body);

        // If validation fails, send an error response
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { fullName, email, subject, message } = req.body;

        console.log(req.body)

        // Create new Contact Us data
        const newContactUs = new ContactUs({fullName, email, subject, message});

        console.log(newContactUs)

        // Save the new Contact Us data
        await newContactUs.save();

        return res.status(201).json({ message: 'Contact us data save successful.' });
    } catch (error) {
        console.error('Error saving contact us data:', error);
        res.status(500).json({ message: 'Contact us post failed.' });
    }
};

module.exports = { postContactUs };
