//An API router file to store the backend API routes
const express = require('express');
const router = express.Router();

// Load Test model
const Test = require('../../models/Test');

// @route GET api/test
// @description test route
// @access Public
router.get('/', (req, res) => res.send('route testing!'));

module.exports = router;