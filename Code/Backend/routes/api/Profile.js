//routes for profile dashboard
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash
const User = require('../../models/User');
//routes for client dashboard
const ProfileController = require('../../controllers/ProfileController');
const { expressjwt } = require("express-jwt")
const bcrypt = require("bcrypt");

const {checkToken} = require("../../utils/tokenProcessor");


//get profile
router.get('/profile/:userID', checkToken, async (req, res) => {
    try {
        //console.log("Request returned: " + req.params)
        let userId = req.params.userID;
        //console.log("User ID returned: " + userId)
        const user = await User.findById(userId).select('-password'); //Exclude password 
        //console.log("User returned: " + user)
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
// router.put('/profile', verifyToken, ProfileController.updateProfile);

router.put('/profile/:userID', checkToken, async(req, res) => {
    try {
        //console.log("Request returned: " + req.params)
        let userId = req.params.userID;
        //console.log("User ID Update returned: " + userId)
        const updateData = req.body;
        //console.log("Update Data: " + updateData)
        if (updateData.newPassword) {
            updateData.password = await bcrypt.hash(updateData.newPassword, saltRounds);
            delete updateData.newPassword;
        }
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        //console.log("User returned: " + user)
        res.json(user);
    } catch (error) {
        console.error('Error updating profile data:', error);
        res.status(500).json({ message: 'Error updating profile data' });
    }
});
module.exports = router;