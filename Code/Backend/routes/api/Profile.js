//routes for profile dashboard
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const key = process.env.ACCESS_TOKEN;
//routes for client dashboard
const ProfileController = require('../../controllers/ProfileController');
// const verifyToken = ProfileController.verifyToken;
const { expressjwt } = require("express-jwt")
const verifyToken = expressjwt({
    secret: key,
    algorithms: ['HS256'],
    getToken: function (request) {
        const token = request.headers.authorization;
        console.log('Received Token:', token);
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            return request.headers.authorization.split(' ')[1];
        } else if (request.query && request.query.token) {
            return request.query.token;
        }
        return null;
    },
});

//get profile
router.get('/profile', verifyToken, ProfileController.getProfile);
//update profile
router.put('/profile', verifyToken, ProfileController.updateProfile);
module.exports = router;