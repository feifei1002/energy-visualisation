const User = require('../models/User');
const UnapprovedUser = require('../models/UnapprovedUser');
const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const bcrypt = require("bcrypt");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash

const registerNewUser = async (req, res) => {
    console.log("Beginning to Register User...") // purpose of debugging
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

const UnapprovedUser = require('../models/UnapprovedUser'); // Make sure to import your UnapprovedUser model

const approveUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const formData = req.body;

        // Create an UnapprovedUser instance and save the details
        const unapprovedUserData = {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            // Add other fields as needed
        };

        const unapprovedUser = new UnapprovedUser(unapprovedUserData);

        await unapprovedUser.save();

        // Update the original user's approval status
        // user.approved = true;
        // await user.save();

        // res.json({message: 'User approved.'});
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({message: 'Approval failed.'});
    }
}
// const approveUser = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId);
//         const formData = req.body;
//
//         // Create an UnapprovedUser instance and save the details
//         const UnapprovedUser = new formData
//
//         await UnapprovedUser.save();
//
//         // Update the original user's approval status
//         user.approved = true;
//         await user.save();
//
//         res.json({ message: 'User approved.' });
//     } catch (error) {
//         console.error('Error approving user:', error);
//         res.status(500).json({ message: 'Approval failed.' });
//     }
// };


module.exports = { registerNewUser, approveUser };

