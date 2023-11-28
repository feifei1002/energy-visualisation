const express = require('express');
const router = express.Router();
const ContactUsController = require('../../controllers/ContactUsController');
const ContactUs = require('../../models/ContactUs');
const bodyParser = require("body-parser");
const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');

// The key for the jwt token to prevent unauthorized access
const secretKey = process.env.ACCESS_TOKEN;

// Middleware to check JWT token of user for accessing protected routes
const checkToken = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
});

router.get('/contactus', (req, res) => {
    res.send('Server is running. /api/contactus endpoint is accessible.');
});

router.post('/savecontactus', ContactUsController.postContactUs);

// Fetch all feedback, protected using JWT token
router.get('/getallfeedback', checkToken, async (req, res) => {
    try {
        const feedback = await ContactUs.find();
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching feedback data.' });
    }
});

module.exports = router;