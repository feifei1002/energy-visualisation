const AdminUser = require('../models/AdminUser');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const postWebAdminLogin = async (req, res) => {
    const data = req.body;

    try {
        const webAdmin = await AdminUser.findOne({ username: data.username });

        if (!webAdmin) {
            console.error('Username does not match any in the system');
            return res.status(401).send('Username is incorrect');
        }

        const comparison = await bcrypt.compare(String(data.password), webAdmin.password);

        if (comparison) {
            const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN, { expiresIn: '30m' });
            res.json({ user: data.username, token: accessToken });
        } else {
            console.error('Password is incorrect');
            res.status(401).send('Password is incorrect');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
};



module.exports = { postWebAdminLogin };