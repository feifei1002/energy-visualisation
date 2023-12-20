const express = require('express');
const router = express.Router();
const ContactUsController = require('../../controllers/ContactUsController');
const ContactUs = require('../../models/ContactUs');

const {checkToken} = require("../../utils/tokenProcessor");

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