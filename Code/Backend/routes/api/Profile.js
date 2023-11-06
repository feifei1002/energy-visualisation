//routes for profile dashboard
const express = require('express');
const router = express.Router();

//routes for client dashboard
const ProfileController = require('../../controllers/ProfileController');
//get profile
router.get('/profile', ProfileController.getProfile);
//update profile
router.put('/profile', ProfileController.updateProfile);

module.exports = router;