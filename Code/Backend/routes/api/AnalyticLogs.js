const express = require('express');
const router = express.Router();
const AnalyticLog = require('../../models/Analytics');
const {expressjwt} = require("express-jwt");



//POST route to create a new analytic log entry
router.post('/analyticlog/', async (req, res) => {
    try {
        let userId = req.params.userID;
        const eventData = {
            userId: userId,
            event: req.body.event,
            location: req.body.location,
            pageUrl: req.body.pageUrl,
            additionalDetails: req.body.additionalDetails
        };

        const newLog = new AnalyticLog(eventData);
        await newLog.save();

        res.status(201).json({ message: 'Analytics log created', logId: newLog._id });
    } catch (error) {
        console.error('Error creating analytic log:', error);
        res.status(500).json({ message: 'Error creating analytic log' });
    }
});

module.exports = router;
