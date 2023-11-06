//An API router file to store the backend API routes
const express = require('express');
const router = express.Router();

// Load Test and user model
const Test = require('../../models/Test');
const User = require('../../models/User')

// @route GET api/test
// @description test route
// @access Public
router.get('/', (req, res) => res.send('route testing!'));

module.exports = router;