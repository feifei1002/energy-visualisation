// RegisterController.js
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');
const PendingUser = require('../models/PendingUser');

const saltRounds = 10;

const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerNewUser = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = registerSchema.validate(req.body);

        // If validation fails, send an error response
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { fullName, username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new PendingUser
        const newUser = new PendingUser({ fullName, username, password: hashedPassword, email });

        // Save the new PendingUser
        await newUser.save();

        return res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};



module.exports = { registerNewUser };
