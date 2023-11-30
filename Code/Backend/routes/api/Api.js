//An API router file to store the backend API routes
const express = require('express');
const router = express.Router();

// Load Test and user model
const Test = require('../../models/Test');

// @route GET api/test
// @description test route
// @access Public
router.get('/', (req, res) => res.send('route testing!'));

//routes for client dashboard
const ProfileController = require('../../controllers/ProfileController');
//get profile
// router.get('/profile', ProfileController.getProfile);
//update profile
// router.put('/profile', ProfileController.updateProfile);

module.exports = router;