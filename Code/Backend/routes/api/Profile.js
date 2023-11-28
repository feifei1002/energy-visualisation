//routes for profile dashboard
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const key = process.env.ACCESS_TOKEN;
//routes for client dashboard
const ProfileController = require('../../controllers/ProfileController');
const { expressjwt } = require("express-jwt")

const verifyToken = expressjwt({
    secret: key,
    algorithms: ['HS256'],
    getToken: (request) => {
        const token = request.headers.authorization?.split(' ')[1] || null;
        return token;
    },
});

//get profile
router.get('/profile/:userID', verifyToken, async (req, res) => {
    try {
        console.log("Request returned: " + req.params)
        let userId = req.params.userID;
        console.log("User ID returned: " + userId)
        const user = await User.findById(userId).select('-password'); //Exclude password 
        console.log("User returned: " + user)
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

//update profile
router.put('/profile', verifyToken, ProfileController.updateProfile);
module.exports = router;