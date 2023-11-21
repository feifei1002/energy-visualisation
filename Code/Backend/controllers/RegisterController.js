const bcrypt = require("bcrypt");
const PendingUser = require("../models/PendingUser");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

const registerNewUser = async (req, res, next) => {
    try {
        const { fullName, username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new PendingUser({ fullName, username, password: hashedPassword, email });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = { registerNewUser, verifyToken };