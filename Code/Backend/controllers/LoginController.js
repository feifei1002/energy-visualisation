const User = require('../models/User');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// post login for authentication
const postLogin = async (req, res) => {
    // Read username and password from request body
    const data = req.body;

    try {
        // find the user in the table with the same username inputted
        // and selects the password
        const user = await User.findOne({username: data.username}).select('password');
        // compares the password inputted with the hashed password in the database, using bcrypt.compare
        const comparison = await bcrypt.compare(String(data.password), user.password);

        // comparison is true if both password match
        if (comparison === true) {
            // user is authenticated, after correctly logs in

            // generate access token
            // https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/ 16/11
            const accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN, { expiresIn: '30m' });

            // send response of access token when correctly authenticated
            res.json({
                accessToken
            });

        } else {
            // when the password doesn't match the one in the database
            console.error("password is incorrect")
            res.send('Password is incorrect');
        }
    } catch (error) {
        // when cannot find a matching username in the database
        console.error('Username does not match any in the system');
        res.send('Username is incorrect');
    }

};

module.exports = {
    postLogin
};