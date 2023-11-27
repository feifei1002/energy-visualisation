//routes for profile dashboard
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
router.get('/profile', verifyToken, ProfileController.getProfile);
//update profile
router.put('/profile', verifyToken, ProfileController.updateProfile);
module.exports = router;