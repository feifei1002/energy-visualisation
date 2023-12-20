//An API router file to store the backend API routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('route testing!'));


module.exports = router;