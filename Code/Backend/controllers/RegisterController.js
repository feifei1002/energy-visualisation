const User = require('../models/User');
const UnapprovedUser = require('../models/UnapprovedUser');
const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const bcrypt = require("bcrypt");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash

const port = process.env.PORT || 8082;

const jwtCheck = auth({
    audience: 'http://localhost:5173/register',
    issuerBaseURL: 'https://dev-osrswyxpukb5rlqq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);
// Register a new user
const registerNewUser = async (req, res) => {

    try {
        const { fullName, username, password, email } = req.body;
        const formData = req.body;
        if (formData.password) {
            formData.password = await bcrypt.hash(formData.password, saltRounds);
            delete formData.password;
        }
        const newUser = new UnapprovedUser({ fullName, username, password, email });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};

const approveUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create an ApprovedUser instance and save the details
        const UnapprovedUser = new UnapprovedUser({
            fullName: user.fullName,
            username: user.username,
            password: user.password,
            email: user.email,
        });

        await UnapprovedUser.save();

        // Update the original user's approval status
        user.approved = true;
        await user.save();

        res.json({ message: 'User approved.' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Approval failed.' });
    }
};


module.exports = { registerNewUser, approveUser };

