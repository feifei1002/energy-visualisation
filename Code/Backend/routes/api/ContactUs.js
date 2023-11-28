const express = require('express');
const router = express.Router();
const ContactUsController = require('../../controllers/ContactUsController');

router.get('/contactus', (req, res) => {
    res.send('Server is running. /api/contactus endpoint is accessible.');
});

router.post('/savecontactus', ContactUsController.postContactUs);

module.exports = router;